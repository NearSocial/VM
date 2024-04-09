import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Markdown } from "./Markdown";
import { displayGas, displayNear, Loading, computeWritePermission } from "../data/utils";
import { useNear } from "../data/near";
import { useCache } from "../data/cache";
import { useAccountId } from "../data/account";
import uuid from "react-uuid";

const jsonMarkdown = (data) => {
  const json = JSON.stringify(data, null, 2);
  return `\`\`\`json
${json}
\`\`\``;
};

const StorageDomain = {
  page: "confirm_transactions",
};

const StorageType = {
  SendTransactionWithoutConfirmation: "send_transaction_without_confirmation",
};

export default function ConfirmTransactions(props) {
  const gkey = useState(uuid());
  const near = useNear(props.networkId);
  const accountId = useAccountId(props.networkId);
  const cache = useCache();

  const [loading, setLoading] = useState(false);

  const [transactions] = useState(props.transactions);
  const [dontAskForConfirmation, setDontAskForConfirmation] = useState(null);
  const [dontAskAgainChecked, setDontAskAgainChecked] = useState(false);
  const [dontAskAgainErrorMessage, setDontAskAgainErrorMessage] = useState(null);

  const widgetSrc = props.widgetSrc;

  const getWidgetContractPermission = async (widgetSrc, contractId) =>
    await cache.asyncLocalStorageGet(StorageDomain, {
      widgetSrc,
      contractId,
      type: StorageType.SendTransactionWithoutConfirmation,
    });

  const eligibleForDontAskAgain = transactions[0].contractName !== near.contract.contractId && transactions.length === 1 && !(transactions[0].deposit && transactions[0].deposit.gt(0));

  useEffect(() => {
    (async () => {
      if (eligibleForDontAskAgain) {
        const contractId = transactions[0].contractName;
        const isSignedIntoContract = await near.isSignedIntoContract(contractId);

        const widgetContractPermission = await getWidgetContractPermission(widgetSrc, contractId);

        const dontAskForConfirmation = !!(isSignedIntoContract && widgetContractPermission && widgetContractPermission[transactions[0].methodName]);

        setDontAskForConfirmation(dontAskForConfirmation);

        if (dontAskForConfirmation) {
          setLoading(true);
          const result = await near.sendTransactions(transactions);
          setLoading(false);
          onHide(result);
        }
      } else {
        setDontAskForConfirmation(false);
      }
    })();
  }, []);

  const onHide = props.onHide;

  const show = !!transactions;

  const dontAskAgainCheckboxChange = async () => {
    setDontAskAgainChecked(!dontAskAgainChecked);
    setDontAskAgainErrorMessage(null);
  };

  if (dontAskForConfirmation === null) {
    return <></>;
  } else if (dontAskForConfirmation) {
    const transaction = transactions[0];
    return (
      <ToastContainer position="bottom-end" className="position-fixed">
        <Toast show={show} bg="info">
          <Toast.Header>
            Sending transaction {Loading}
          </Toast.Header>
          <Toast.Body>
            Calling contract <span className="font-monospace">{transaction.contractName}</span> with method <span className="font-monospace">{transaction.methodName}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  } else {
    return (
      <Modal size="xl" centered scrollable show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactions &&
            transactions.map((transaction, i) => (
              <div key={`${gkey}-${i}`}>
                <div>
                  <h4>Transaction #{i + 1}</h4>
                </div>
                <div>
                  <span className="text-secondary">Contract ID: </span>
                  <span className="font-monospace">
                    {transaction.contractName}
                  </span>
                </div>
                <div>
                  <span className="text-secondary">Method name: </span>
                  <span className="font-monospace">{transaction.methodName}</span>
                </div>
                {transaction.deposit && transaction.deposit.gt(0) && (
                  <div>
                    <span className="text-secondary">Deposit: </span>
                    <span className="font-monospace">
                      {displayNear(transaction.deposit)}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-secondary">Gas: </span>
                  <span className="font-monospace">
                    {displayGas(transaction.gas)}
                  </span>
                </div>
                <Markdown text={jsonMarkdown(transaction.args)} />
              </div>
            ))}
          {eligibleForDontAskAgain ?
            <>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="dontaskagaincheckbox"
                  checked={dontAskAgainChecked}
                  onChange={() => dontAskAgainCheckboxChange()}
                />
                <label class="form-check-label" for="dontaskagaincheckbox">
                  Don't ask again for sending similar transactions by{" "}
                  <span className="font-monospace">{widgetSrc}</span>
                </label>
              </div>
              {dontAskAgainErrorMessage ?
                <Alert variant="danger">
                  There was an error when choosing "Don't ask again": {dontAskAgainErrorMessage}
                </Alert>
                : <></>}
            </>
            :
            <></>
          }
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-success"
            disabled={loading}
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              if (dontAskAgainChecked) {
                const pendingTransaction = transactions[0];
                const contractId = pendingTransaction.contractName;
                const methodName = pendingTransaction.methodName;
                const permissionObject = (await getWidgetContractPermission(widgetSrc, contractId)) || {};
                permissionObject[methodName] = true;

                cache.localStorageSet(
                  StorageDomain,
                  {
                    widgetSrc,
                    contractId,
                    type: StorageType.SendTransactionWithoutConfirmation,
                  },
                  permissionObject
                );

                try {
                  if (!(await near.isSignedIntoContract(contractId))) {
                    const results = await near.signInAndSetPendingTransaction(pendingTransaction);
                    setLoading(false);
                    onHide(results ? results.find(result => result.transaction.receiver_id === contractId) : results);
                    return;
                  }
                } catch (e) {
                  setDontAskAgainErrorMessage(e.message);
                  setLoading(false);
                  return;
                }
              }
              const result = await near.sendTransactions(transactions);
              setLoading(false);
              onHide(result);
            }}
          >
            {loading && Loading} Confirm
          </button>
          <button
            className="btn btn-secondary"
            onClick={onHide}
            disabled={loading}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal >
    );
  }
}
