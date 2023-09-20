import React from "react";
import { useAccount, useAccountId } from "./lib/data/account";
import { useInitNear, useNear } from "./lib/data/near";
import { Widget } from "./lib/components/Widget";
import { useCache } from "./lib/data/cache";
import * as utils from "./lib/data/utils";
import { CommitButton } from "./lib/components/Commit";
import { EthersProviderContext } from "./lib/components/ethers";
import { GlobalStateContext } from "./lib/components/globalState";
export {
  Widget,
  CommitButton,
  useInitNear,
  useNear,
  useCache,
  useAccount,
  useAccountId,
  utils,
  EthersProviderContext,
  GlobalStateContext,
};
