import * as nearAPI from "near-api-js";
import Big from "big.js";
import { useEffect, useMemo, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { MaxGasPerTransaction, TGas } from "./utils";

const UseLegacyFunctionCallCreator = true;
export const functionCallCreator = UseLegacyFunctionCallCreator
  ? (methodName, args, gas, deposit) => ({
      type: "FunctionCall",
      params: {
        methodName,
        args,
        gas,
        deposit,
      },
    })
  : nearAPI.transactions.functionCall;

const TestNearConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  archivalNodeUrl: "https://rpc.testnet.internal.near.org",
  contractName: "v1.social08.testnet",
  walletUrl: "https://wallet.testnet.near.org",
  wrapNearAccountId: "wrap.testnet",
  apiUrl: "https://discovery-api.stage.testnet.near.org",
  enableWeb4FastRpc: false,
};

export const MainNearConfig = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  archivalNodeUrl: "https://rpc.mainnet.internal.near.org",
  contractName: "social.near",
  walletUrl: "https://wallet.near.org",
  wrapNearAccountId: "wrap.near",
  apiUrl: "https://api.near.social",
  enableWeb4FastRpc: false,
};

const SupportedApiMethods = {
  get: true,
  keys: true,
};

const apiCall = async (config, methodName, args, blockId, fallback) => {
  if (!config.apiUrl || !(methodName in SupportedApiMethods)) {
    return fallback();
  }
  args = args || {};

  if (blockId) {
    args.blockHeight = blockId;
  }

  try {
    return await (
      await fetch(`${config.apiUrl}/${methodName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      })
    ).json();
  } catch (e) {
    console.log("API call failed", methodName, args);
    console.error(e);
    return fallback();
  }
};

async function functionCall(
  near,
  contractName,
  methodName,
  args,
  gas,
  deposit
) {
  try {
    const wallet = await (await near.selector).wallet();

    return await wallet.signAndSendTransaction({
      receiverId: contractName,
      actions: [
        functionCallCreator(
          methodName,
          args,
          gas ?? TGas.mul(30).toFixed(0),
          deposit ?? "0"
        ),
      ],
    });
  } catch (e) {
    // const msg = e.toString();
    // if (msg.indexOf("does not have enough balance") !== -1) {
    //   return await refreshAllowanceObj.refreshAllowance();
    // }
    throw e;
  }
}

async function accountState(near, accountId) {
  const account = new nearAPI.Account(
    near.nearConnection.connection,
    accountId
  );
  return await account.state();
}

async function sendTransactions(near, functionCalls) {
  try {
    const wallet = await (await near.selector).wallet();
    const transactions = [];
    let currentTotalGas = Big(0);
    functionCalls.forEach(
      ({ contractName, methodName, args, gas, deposit }) => {
        const newTotalGas = currentTotalGas.add(gas);

        const action = functionCallCreator(
          methodName,
          args,
          gas.toFixed(0),
          deposit.toFixed(0)
        );
        if (
          transactions[transactions.length - 1]?.receiverId !== contractName ||
          newTotalGas.gt(MaxGasPerTransaction)
        ) {
          transactions.push({
            receiverId: contractName,
            actions: [],
          });
          currentTotalGas = gas;
        } else {
          currentTotalGas = newTotalGas;
        }
        transactions[transactions.length - 1].actions.push(action);
      }
    );
    return await wallet.signAndSendTransactions({ transactions });
  } catch (e) {
    // const msg = e.toString();
    // if (msg.indexOf("does not have enough balance") !== -1) {
    //   return await refreshAllowanceObj.refreshAllowance();
    // }
    throw e;
  }
}

function setupContract(near, contractId, options) {
  const { viewMethods = [], changeMethods = [] } = options;
  const contract = {
    near,
    contractId,
  };
  viewMethods.forEach((methodName) => {
    contract[methodName] = (args) =>
      near.viewCall(contractId, methodName, args);
  });
  changeMethods.forEach((methodName) => {
    contract[methodName] = (args, gas, deposit) =>
      near.functionCall(contractId, methodName, args, gas, deposit);
  });
  return contract;
}

async function viewCall(
  provider,
  blockId,
  contractId,
  methodName,
  args,
  finality
) {
  args = args || {};
  const result = await provider.query({
    request_type: "call_function",
    account_id: contractId,
    method_name: methodName,
    args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
    block_id: blockId,
    finality,
  });

  return (
    result.result &&
    result.result.length > 0 &&
    JSON.parse(Buffer.from(result.result).toString())
  );
}

async function web4ViewCall(contractId, methodName, args, fallback) {
  args = args || {};
  const url = new URL(
    `https://rpc.web4.near.page/account/${contractId}/view/${methodName}`
  );
  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(`${key}.json`, JSON.stringify(value));
    }
  });
  try {
    return await (await fetch(url.toString())).json();
  } catch (e) {
    console.log("Web4 view call failed", url.toString());
    console.error(e);
    return fallback();
  }
}

async function _initNear({
  networkId,
  config,
  keyStore,
  selector,
  walletConnectCallback = () => {},
  customElements = {},
}) {
  if (!config) {
    config = {};
    if (!networkId) {
      config.networkId = "mainnet";
    }
  }
  if (networkId && !config.networkId) {
    config.networkId = networkId;
  }
  if (config.networkId === "mainnet") {
    config = Object.assign({}, MainNearConfig, config);
  } else if (config.networkId === "testnet") {
    config = Object.assign({}, TestNearConfig, config);
  }
  config.walletConnectCallback = walletConnectCallback;
  config.customElements = Object.assign(
    {},
    config.customElements,
    customElements
  );
  keyStore = keyStore ?? new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  const nearConnection = await nearAPI.connect(
    Object.assign({ deps: { keyStore } }, config)
  );

  const _near = {
    config,
    selector,
    keyStore,
    nearConnection,
  };

  _near.nearArchivalConnection = nearAPI.Connection.fromConfig({
    networkId: config.networkId,
    provider: {
      type: "JsonRpcProvider",
      args: { url: config.archivalNodeUrl },
    },
    signer: { type: "InMemorySigner", keyStore },
  });

  const transformBlockId = (blockId) =>
    blockId === "optimistic" || blockId === "final"
      ? {
          finality: blockId,
          blockId: undefined,
        }
      : blockId !== undefined && blockId !== null
      ? {
          finality: undefined,
          blockId: parseInt(blockId),
        }
      : {
          finality: config.defaultFinality ?? "optimistic",
          blockId: undefined,
        };

  _near.viewCall = (contractId, methodName, args, blockHeightOrFinality) => {
    const { blockId, finality } = transformBlockId(blockHeightOrFinality);
    const nearViewCall = () =>
      viewCall(
        blockId
          ? _near.nearArchivalConnection.provider
          : _near.nearConnection.connection.provider,
        blockId ?? undefined,
        contractId,
        methodName,
        args,
        finality
      );

    const fastRpcCall = () =>
      finality === "optimistic" && config.enableWeb4FastRpc
        ? web4ViewCall(contractId, methodName, args, nearViewCall)
        : nearViewCall();

    return contractId === config.contractName &&
      (blockId || finality === "final")
      ? apiCall(config, methodName, args, blockId, fastRpcCall)
      : fastRpcCall();
  };

  _near.block = (blockHeightOrFinality) => {
    const blockQuery = transformBlockId(blockHeightOrFinality);
    const provider = blockQuery.blockId
      ? _near.nearArchivalConnection.provider
      : _near.nearConnection.connection.provider;
    return provider.block(blockQuery);
  };
  _near.functionCall = (contractName, methodName, args, gas, deposit) =>
    functionCall(_near, contractName, methodName, args, gas, deposit);
  _near.sendTransactions = (transactions) =>
    sendTransactions(_near, transactions);

  _near.contract = setupContract(_near, config.contractName, {
    viewMethods: [
      "storage_balance_of",
      "get",
      "get_num_accounts",
      "get_accounts_paged",
      "is_write_permission_granted",
      "keys",
    ],
    changeMethods: [
      "set",
      "grant_write_permission",
      "storage_deposit",
      "storage_withdraw",
    ],
  });

  _near.accountState = (accountId) => accountState(_near, accountId);

  return _near;
}

export const useInitNear = singletonHook({}, () => {
  const [nearPromise, setNearPromise] = useState(null);

  return {
    nearPromise,
    initNear: useMemo(
      () => (args) => {
        const defaultNetworkId = args.config?.networkId || args.networkId;
        const defaultNetworkIdIsNotMainnetOrTestnet =
          defaultNetworkId !== "mainnet" && defaultNetworkId !== "testnet";
        const testnetArgs =
          defaultNetworkId === "testnet"
            ? args
            : {
                ...args,
                networkId: "testnet",
                config: undefined,
                keyStore: undefined,
                selector: undefined,
              };
        const mainnetArgs =
          defaultNetworkId === "mainnet"
            ? args
            : {
                ...args,
                networkId: "mainnet",
                config: undefined,
                keyStore: undefined,
                selector: undefined,
              };
        return setNearPromise(
          Promise.all(
            [testnetArgs, mainnetArgs]
              .concat(defaultNetworkIdIsNotMainnetOrTestnet ? args : [])
              .map(_initNear)
          ).then((nears) =>
            nears.map((n) => ({
              ...n,
              default: n.config.networkId === defaultNetworkId,
            }))
          )
        );
      },
      []
    ),
  };
});

const defaultNears = [];
const useMultiNetworkNear = singletonHook(defaultNears, () => {
  const [nears, setNears] = useState(defaultNears);
  const { nearPromise } = useInitNear();
  useEffect(() => {
    nearPromise && nearPromise.then(setNears);
  }, [nearPromise]);

  if (!nears) {
    return nears;
  }

  return {
    default: nears.find((n) => n.default),
    testnet: nears.find((n) => n.config.networkId === "testnet"),
    mainnet: nears.find((n) => n.config.networkId === "mainnet"),
  };
});

export const useNear = (networkId) => {
  const multiNetworkNear = useMultiNetworkNear();

  return multiNetworkNear[networkId || "default"] || null;
};
