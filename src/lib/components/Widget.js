import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useNear } from "../data/near";
import ConfirmTransactions from "./ConfirmTransactions";
import VM from "../vm/vm";
import {
  deepCopy,
  deepEqual,
  ErrorFallback,
  isObject,
  isString,
  isFunction,
  Loading,
  TGas,
  computeSrcOrCode,
} from "../data/utils";
import { ErrorBoundary } from "react-error-boundary";
import { useCache } from "../data/cache";
import { CommitModal } from "./Commit";
import { useAccountId } from "../data/account";
import Big from "big.js";
import uuid from "react-uuid";
import { EthersProviderContext } from "./ethers";

export const Widget = React.forwardRef((props, forwardedRef) => {
  const {
    loading,
    src: propsSrc,
    code: propsCode,
    depth,
    config: propsConfig,
    props: propsProps,
    ...forwardedProps
  } = props;

  const [nonce, setNonce] = useState(0);
  const [code, setCode] = useState(null);
  const [src, setSrc] = useState(null);
  const [reactState, setReactState] = useState({
    hooks: [],
    state: undefined,
  });
  const [cacheNonce, setCacheNonce] = useState(0);
  const [context, setContext] = useState({});
  const [vm, setVm] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [commitRequest, setCommitRequest] = useState(null);
  const [prevVmInput, setPrevVmInput] = useState(null);
  const [configs, setConfigs] = useState(null);
  const [srcOrCode, setSrcOrCode] = useState(null);
  const ethersProviderContext = useContext(EthersProviderContext);

  const networkId =
    configs &&
    configs.findLast((config) => config && config.networkId)?.networkId;
  const cache = useCache(networkId);
  const near = useNear(networkId);
  const accountId = useAccountId(networkId);
  const [element, setElement] = useState(null);

  useEffect(() => {
    const newConfigs = propsConfig
      ? Array.isArray(propsConfig)
        ? propsConfig
        : [propsConfig]
      : [];
    if (!deepEqual(newConfigs, configs)) {
      setConfigs(newConfigs);
    }
  }, [propsConfig, configs]);

  useEffect(() => {
    const computedSrcOrCode = computeSrcOrCode(propsSrc, propsCode, configs);
    if (!deepEqual(computedSrcOrCode, srcOrCode)) {
      setSrcOrCode(computedSrcOrCode);
    }
  }, [propsSrc, propsCode, configs, srcOrCode]);

  useEffect(() => {
    if (!near) {
      return;
    }
    if (srcOrCode?.src) {
      const src = srcOrCode.src;
      const [srcPath, version] = src.split("@");
      const code = cache.socialGet(
        near,
        srcPath.toString(),
        false,
        version, // may be undefined, meaning `latest`
        undefined,
        () => {
          setNonce(nonce + 1);
        }
      );
      setCode(code);
      setSrc(src);
    } else if (srcOrCode?.code) {
      setCode(srcOrCode.code);
      setSrc(null);
    }
  }, [near, srcOrCode, nonce]);

  useEffect(() => {
    setVm(null);
    setElement(null);
    if (!code) {
      if (code === undefined) {
        setElement(
          <div className="alert alert-danger">
            Source code for "{src}" is not found
          </div>
        );
      }
    }
  }, [code, src]);

  const confirmTransactions = useCallback(
    (transactions) => {
      if (!near || !transactions || transactions.length === 0) {
        return null;
      }
      transactions = transactions.map((t) => ({
        contractName: t.contractName,
        methodName: t.methodName,
        args: t.args || {},
        deposit: t.deposit ? Big(t.deposit) : Big(0),
        gas: t.gas ? Big(t.gas) : TGas.mul(30),
      }));
      console.log("confirm txs", transactions);
      setTransactions(transactions);
    },
    [near]
  );

  const requestCommit = useCallback(
    (commitRequest) => {
      if (!near) {
        return null;
      }
      console.log("commit requested", commitRequest);
      setCommitRequest(commitRequest);
    },
    [near]
  );

  useEffect(() => {
    if (!near || !code) {
      return;
    }
    setReactState({ hooks: [], state: undefined });
    const vm = new VM({
      near,
      rawCode: code,
      setReactState,
      cache,
      refreshCache: () => {
        setCacheNonce((cacheNonce) => cacheNonce + 1);
      },
      confirmTransactions,
      depth,
      widgetSrc: src,
      requestCommit,
      version: uuid(),
      widgetConfigs: configs,
      ethersProviderContext,
    });
    setVm(vm);
    return () => {
      vm.stop();
    };
  }, [
    src,
    near,
    code,
    depth,
    requestCommit,
    confirmTransactions,
    configs,
    ethersProviderContext,
  ]);

  useEffect(() => {
    if (!near) {
      return;
    }
    setContext({
      loading: false,
      accountId: accountId ?? null,
      widgetSrc: src,
      networkId: near.config.networkId,
    });
  }, [near, accountId, src]);

  useLayoutEffect(() => {
    if (!vm) {
      return;
    }
    const vmInput = {
      props: propsProps || {},
      context,
      reactState,
      cacheNonce,
      version: vm.version,
      forwardedProps: {
        ...forwardedProps,
        ref: forwardedRef,
      },
    };
    if (deepEqual(vmInput, prevVmInput)) {
      return;
    }
    setPrevVmInput(deepCopy(vmInput));
    try {
      setElement(vm.renderCode(vmInput) ?? "Execution failed");
    } catch (e) {
      setElement(
        <div className="alert alert-danger">
          Execution error:
          <pre>{e.message}</pre>
          <pre>{e.stack}</pre>
        </div>
      );
      console.error(e);
    }
  }, [
    vm,
    propsProps,
    context,
    reactState,
    cacheNonce,
    prevVmInput,
    forwardedRef,
    forwardedProps,
  ]);

  return element !== null && element !== undefined ? (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setElement(null);
      }}
      resetKeys={[element]}
    >
      <>
        {element}
        {transactions && (
          <ConfirmTransactions
            transactions={transactions}
            onHide={() => setTransactions(null)}
            networkId={networkId}
          />
        )}
        {commitRequest && (
          <CommitModal
            show={true}
            widgetSrc={src}
            data={commitRequest.data}
            force={commitRequest.force}
            onHide={() => setCommitRequest(null)}
            onCommit={commitRequest.onCommit}
            onCancel={commitRequest.onCancel}
            networkId={networkId}
          />
        )}
      </>
    </ErrorBoundary>
  ) : (
    loading ?? Loading
  );
});
