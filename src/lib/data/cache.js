import { indexMatch, isObject, patternMatch } from "./utils";
import { openDB } from "idb";
import { singletonHook } from "react-singleton-hook";
import { useNear } from "./near";

const Action = {
  ViewCall: "ViewCall",
  Fetch: "Fetch",
  Block: "Block",
  LocalStorage: "LocalStorage",
  CustomPromise: "CustomPromise",
  EthersCall: "EthersCall",
};

const CacheStatus = {
  NotStarted: "NotStarted",
  InProgress: "InProgress",
  Done: "Done",
  Invalidated: "Invalidated",
};

const ExpirationTimeoutMs = 1000 * 60 * 5; // 5 minutes
const CacheSubscriptionTimeoutMs = 5000;
const CacheDebug = false;

const CacheDb = "cacheDb";
const SecondaryCacheDb = "secondaryCacheDb";
const CacheDbObject = "cache-v1";

class Cache {
  constructor(cacheName = CacheDb, finalSynchronizationDelayMs = 3000) {
    this.dbPromise = openDB(cacheName, 1, {
      upgrade(db) {
        db.createObjectStore(CacheDbObject);
      },
    });
    this.cache = {};
    this.finalSynchronizationDelayMs = finalSynchronizationDelayMs;
  }

  invalidateCallbacks(cached, isFinal) {
    if (cached.invalidationCallbacks?.length) {
      const callbacks = cached.invalidationCallbacks;
      cached.invalidationCallbacks = [];
      setTimeout(
        () => {
          callbacks.forEach((cb) => {
            try {
              cb();
            } catch {
              // ignore
            }
          });
        },
        isFinal ? this.finalSynchronizationDelayMs + 50 : 50
      );
    }
  }

  async innerGet(key) {
    return (await this.dbPromise).get(CacheDbObject, key);
  }

  async innerSet(key, val) {
    return (await this.dbPromise).put(CacheDbObject, val, key);
  }

  cachedPromise(key, promise, invalidate, cacheOptions) {
    key = JSON.stringify(key);
    const cached = this.cache[key] || {
      status: CacheStatus.NotStarted,
      invalidationCallbacks: [],
      result: null,
      time: new Date().getTime(),
    };
    this.cache[key] = cached;
    if (!isObject(invalidate)) {
      invalidate = {
        onInvalidate: invalidate,
      };
    }
    if (invalidate.onInvalidate) {
      cached.invalidationCallbacks.push(invalidate.onInvalidate);
    }
    if (!cached.subscription && invalidate.subscribe) {
      const makeTimer = () => {
        cached.subscription = setTimeout(() => {
          CacheDebug && console.log("Cached subscription invalidation", key);
          if (document.hidden) {
            makeTimer();
          } else {
            cached.subscription = null;
            cached.status = CacheStatus.Invalidated;
            this.invalidateCallbacks(cached, false);
          }
        }, CacheSubscriptionTimeoutMs);
      };
      makeTimer();
    }
    if (cached.status === CacheStatus.InProgress) {
      return cached.result;
    }
    if (
      cached.status === CacheStatus.Done &&
      cached.time + ExpirationTimeoutMs > new Date().getTime()
    ) {
      return cached.result;
    }
    if (
      cached.status === CacheStatus.NotStarted &&
      !cacheOptions?.ignoreCache
    ) {
      this.innerGet(key).then((cachedResult) => {
        if (
          (cachedResult || cacheOptions?.forceCachedValue) &&
          cached.status === CacheStatus.InProgress
        ) {
          CacheDebug && console.log("Cached value", key, cachedResult);
          cached.result = cachedResult;
          cached.time = new Date().getTime();
          this.invalidateCallbacks(cached, false);
        }
      });
    }
    cached.status = CacheStatus.InProgress;
    if (promise) {
      promise()
        .then((result) => {
          CacheDebug && console.log("Fetched result", key);
          cached.status = CacheStatus.Done;
          cached.time = new Date().getTime();
          if (JSON.stringify(result) !== JSON.stringify(cached.result)) {
            cached.result = result;
            this.innerSet(key, result);
            CacheDebug && console.log("Replacing value", key, result);
            this.invalidateCallbacks(cached, false);
          }
        })
        .catch((e) => {
          console.error(e);
          cached.status = CacheStatus.Done;
          const result = undefined;
          cached.time = new Date().getTime();
          if (JSON.stringify(result) !== JSON.stringify(cached.result)) {
            cached.result = result;
            this.innerSet(key, result);
            CacheDebug && console.log("Replacing value", key, result);
            this.invalidateCallbacks(cached, false);
          }
        });
    }
    CacheDebug && console.log("New cache request", key);
    return cached.result;
  }

  invalidateCache(near, data) {
    const affectedKeys = [];
    const indexUrl = `${near.config.apiUrl}/index`;
    Object.keys(this.cache).forEach((stringKey) => {
      let key;
      try {
        key = JSON.parse(stringKey);
      } catch (e) {
        console.error("Key deserialization failed", stringKey);
        return;
      }
      if (
        key.action === Action.ViewCall &&
        key.contractId === near.config.contractName &&
        (!key.blockId ||
          key.blockId === "optimistic" ||
          key.blockId === "final")
      ) {
        try {
          const keys = key.args?.keys;
          if (
            keys.some((pattern) => patternMatch(key.methodName, pattern, data))
          ) {
            affectedKeys.push([stringKey, key.blockId === "final"]);
          }
        } catch {
          // ignore
        }
      }
      // Trying to parse index
      if (key.action === Action.Fetch && key.url === indexUrl) {
        try {
          const { action, key: indexKey } = JSON.parse(key.options?.body);
          if (action && indexKey && indexMatch(action, indexKey, data)) {
            // console.log("Invalidating index", action, indexKey);
            affectedKeys.push([stringKey, true]);
          }
        } catch {
          // ignore
        }
      }
    });
    console.log("Cache invalidation", affectedKeys);
    affectedKeys.forEach(([stringKey, isFinal]) => {
      const cached = this.cache[stringKey];
      cached.status = CacheStatus.Invalidated;
      this.invalidateCallbacks(cached, isFinal);
    });
  }

  cachedBlock(near, blockId, invalidate, cacheOptions) {
    return this.cachedPromise(
      {
        action: Action.Block,
        blockId,
      },
      () => near.block(blockId),
      invalidate,
      cacheOptions
    );
  }

  cachedViewCall(
    near,
    contractId,
    methodName,
    args,
    blockId,
    invalidate,
    cacheOptions
  ) {
    return this.cachedPromise(
      {
        action: Action.ViewCall,
        contractId,
        methodName,
        args,
        blockId,
      },
      () => near.viewCall(contractId, methodName, args, blockId),
      invalidate,
      cacheOptions
    );
  }

  async asyncFetch(url, options) {
    const responseType = options?.responseType?.toLowerCase();
    options = {
      method: options?.method,
      headers: options?.headers,
      body: options?.body,
    };
    try {
      const response = await fetch(url, options);
      const status = response.status;
      const ok = response.ok;
      const contentType = response.headers.get("content-type");
      const body = ok
        ? await (responseType === "arraybuffer"
            ? response.arrayBuffer()
            : responseType === "blob"
            ? response.blob()
            : responseType === "formdata"
            ? response.formData()
            : responseType === "json"
            ? response.json()
            : responseType === "text"
            ? response.text()
            : contentType && contentType.indexOf("application/json") !== -1
            ? response.json()
            : response.text())
        : undefined;
      return {
        ok,
        status,
        contentType,
        body,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }

  cachedFetch(url, options, invalidate, cacheOptions) {
    return this.cachedPromise(
      {
        action: Action.Fetch,
        url,
        options,
      },
      () => this.asyncFetch(url, options),
      invalidate,
      cacheOptions
    );
  }

  cachedCustomPromise(key, promise, invalidate, cacheOptions) {
    return this.cachedPromise(
      {
        action: Action.CustomPromise,
        key,
      },
      () => promise(),
      invalidate,
      cacheOptions
    );
  }

  socialGet(near, keys, recursive, blockId, options, invalidate, cacheOptions) {
    if (!near) {
      return null;
    }
    keys = Array.isArray(keys) ? keys : [keys];
    keys = keys.map((key) => (recursive ? `${key}/**` : `${key}`));
    const args = {
      keys,
      options,
    };
    let data = this.cachedViewCall(
      near,
      near.config.contractName,
      "get",
      args,
      blockId,
      invalidate,
      cacheOptions
    );
    if (data === null) {
      return null;
    }

    if (keys.length === 1) {
      const parts = keys[0].split("/");
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === "*" || part === "**") {
          break;
        }
        data = data?.[part];
      }
    }

    return data;
  }

  socialIndex(near, action, key, options, invalidate, cacheOptions) {
    const res = this.cachedFetch(
      `${near.config.apiUrl}/index`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          key,
          options,
        }),
      },
      invalidate,
      cacheOptions
    );

    return res?.ok ? res.body : null;
  }

  localStorageGet(domain, key, invalidate) {
    return this.cachedPromise(
      {
        action: Action.LocalStorage,
        domain,
        key,
      },
      undefined,
      invalidate,
      {
        forceCachedValue: true,
      }
    );
  }

  asyncLocalStorageGet(domain, key) {
    key = JSON.stringify({
      action: Action.LocalStorage,
      domain,
      key,
    });

    return this.innerGet(key);
  }

  localStorageSet(domain, key, value) {
    key = JSON.stringify({
      action: Action.LocalStorage,
      domain,
      key,
    });
    const cached = this.cache[key] || {
      status: CacheStatus.NotStarted,
      invalidationCallbacks: [],
      result: null,
      time: new Date().getTime(),
    };
    this.cache[key] = cached;
    cached.status = CacheStatus.Done;
    if (JSON.stringify(value) !== JSON.stringify(cached.result)) {
      cached.result = value;
      this.innerSet(key, value);
      CacheDebug && console.log("Replacing value", key, value);
      this.invalidateCallbacks(cached, false);
    }
  }

  cachedEthersCall(ethersProvider, callee, args, invalidate, cacheOptions) {
    if (!ethersProvider) {
      return null;
    }
    return this.cachedPromise(
      {
        action: Action.EthersCall,
        callee,
        args,
      },
      () => ethersProvider[callee](...args),
      invalidate,
      cacheOptions
    );
  }
}

const defaultCache = new Cache();
const secondaryCache = new Cache(SecondaryCacheDb);

const useDefaultCache = singletonHook(defaultCache, () => {
  return defaultCache;
});

const useSecondaryCache = singletonHook(secondaryCache, () => {
  return secondaryCache;
});

export const useCache = (networkId) => {
  const near = useNear();
  const defaultCache = useDefaultCache();
  const secondaryCache = useSecondaryCache();

  if (!networkId || networkId === near.config.networkId) {
    return defaultCache;
  }

  return secondaryCache;
};
