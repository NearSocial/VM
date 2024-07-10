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
import { functionCallCreator } from "./near";

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
    !accountStorage ? MinStorageBalance : permissionGranted ? Big(0) : Big(1)
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
  return await conditionalCommit(near, data, deposit);

  // return await near.contract.set(
  //   {
  //     data,
  //   },
  //   TGas.mul(100).toFixed(0),
  //   deposit.toFixed(0)
  // );
};

// NOTE: The following method is commented out since it's not being used anywhere...
// export const asyncCommitData = async (near, originalData, forceRewrite) => {
//   const { data, deposit } = await prepareCommit(
//     near,
//     originalData,
//     forceRewrite
//   );
//   return asyncCommit(near, data, deposit);
// };

export const requestPermissionAndCommit = async (near, data, deposit) => {
  const actions = [];

  if (near.publicKey) {
    actions.push(
      functionCallCreator(
        "grant_write_permission",
        {
          public_key: near.publicKey.toString(),
          keys: [near.accountId],
        },
        TGas.mul(100).toFixed(0),
        deposit.gt(0) ? deposit.toFixed(0) : "1"
      )
    );
    deposit = Big(0);
  }

  return await conditionalCommit(near, data, deposit, actions);
};

const conditionalCommit = async (near, data, deposit, otherActions = []) => {
  const wallet = await (await near.selector).wallet();
  const actions = [...otherActions];

  actions.push(
    functionCallCreator(
      "set",
      { data },
      TGas.mul(100).toFixed(0),
      deposit.gt(0) ? deposit.toFixed(0) : "1"
    )
  );

  if (wallet.signAndSendDelegateAction) {
    /*
      If the user is signed in with FastAuth, use the delegate action to pass through the relayer.
      The relayer automatically deposits a certain amount of storage for each FastAuth account, which 
      is enough for most actions on Social DB. Passing a non-zero amount of deposit to the relayer 
      currently throws an error due to the SDK not using a full access key.
    */

    actions.forEach((action) => (action.params.deposit = "0"));

    return await wallet.signAndSendDelegateAction({
      receiverId: near.config.contractName,
      actions,
    });
  }

  return await wallet.signAndSendTransaction({
    receiverId: near.config.contractName,
    actions,
  });
};
