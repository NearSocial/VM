import {
  bigMax,
  convertToStringLeaves,
  estimateDataSize,
  extractKeys,
  removeDuplicates,
  StorageCostPerByte,
  TGas,
} from "./utils";
import Big from "big.js";

const MinStorageBalance = StorageCostPerByte.mul(2000);
const InitialAccountStorageBalance = StorageCostPerByte.mul(500);
const ExtraStorageBalance = StorageCostPerByte.mul(500);
const StorageForPermission = StorageCostPerByte.mul(500);

const fetchCurrentData = async (near, data) => {
  const keys = extractKeys(data);
  return await near.contract.get({
    keys,
  });
};

export const prepareCommit = async (
  near,
  accountId,
  originalData,
  forceRewrite
) => {
  await near.selector;
  const signedAccountId = near.accountId;
  if (!signedAccountId) {
    alert("You're not logged in. Sign in to commit data.");
    return;
  }
  const [accountStorage, permissionGranted] = await Promise.all([
    near.viewCall(near.config.contractName, "get_account_storage", {
      account_id: signedAccountId,
    }),
    signedAccountId !== accountId
      ? near.viewCall(near.config.contractName, "is_write_permission_granted", {
          predecessor_id: signedAccountId,
          key: accountId,
        })
      : Promise.resolve(true),
  ]);
  const availableBytes = Big(accountStorage?.available_bytes || "0");
  let data = {
    [accountId]: convertToStringLeaves(originalData),
  };
  let currentData = {};
  if (!forceRewrite) {
    currentData = await fetchCurrentData(near, data);
    data = removeDuplicates(data, currentData);
  }
  const expectedDataBalance = StorageCostPerByte.mul(
    estimateDataSize(data, currentData)
  )
    .add(accountStorage ? Big(0) : InitialAccountStorageBalance)
    .add(permissionGranted ? Big(0) : StorageForPermission)
    .add(ExtraStorageBalance);
  const deposit = bigMax(
    expectedDataBalance.sub(availableBytes.mul(StorageCostPerByte)),
    permissionGranted ? Big(0) : accountStorage ? Big(1) : MinStorageBalance
  );
  return {
    originalData,
    accountId,
    accountStorage,
    availableBytes,
    currentData,
    data,
    expectedDataBalance,
    deposit,
    permissionGranted,
  };
};

export const asyncCommit = async (near, data, deposit) => {
  console.log("Committing data", data);

  return await near.contract.set(
    {
      data,
    },
    TGas.mul(100).toFixed(0),
    deposit.toFixed(0)
  );
};

export const asyncCommitData = async (near, originalData, forceRewrite) => {
  const { data, deposit } = await prepareCommit(
    near,
    originalData,
    forceRewrite
  );
  return asyncCommit(near, data, deposit);
};

export const requestPermissionAndCommit = async (near, data, deposit) => {
  const wallet = await (await near.selector).wallet();
  const actions = [];
  if (near.publicKey) {
    actions.push({
      type: "FunctionCall",
      params: {
        methodName: "grant_write_permission",
        args: {
          public_key: near.publicKey.toString(),
          keys: [near.accountId],
        },
        gas: TGas.mul(100).toFixed(0),
        deposit: deposit.gt(0) ? deposit.toFixed(0) : "1",
      },
    });
    deposit = Big(0);
  }
  actions.push({
    type: "FunctionCall",
    params: {
      methodName: "set",
      args: {
        data,
      },
      gas: TGas.mul(100).toFixed(0),
      deposit: deposit.gt(0) ? deposit.toFixed(0) : "1",
    },
  });
  return await wallet.signAndSendTransaction({
    receiverId: near.config.contractName,
    actions,
  });
};
