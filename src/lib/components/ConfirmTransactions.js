import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import uuid from "react-uuid";

import { displayGas, displayNear, Loading, OneNear, TGas } from "../data/utils";
import { useNear } from "../data/near";
import { Markdown } from "./Markdown";

const jsonMarkdown = (data) => {
  const json = JSON.stringify(data, null, 2);
  return `\`\`\`json
${json}
\`\`\``;
};

export default function ConfirmTransactions(props) {
  const gkey = useState(uuid());
  const near = useNear(props.networkId);
  const [loading, setLoading] = useState(false);

  const onHide = props.onHide;
  const transactions = props.transactions;
  const show = !!transactions;

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

              {transaction.actions.map((action) => (
                <>
                  <div>
                    <span className="text-secondary">Action type: </span>
                    <span className="font-monospace">{action.type}</span>
                  </div>

                  {action.type === "FunctionCall" && (
                    <>
                      <div>
                        <span className="text-secondary">Contract ID: </span>
                        <span className="font-monospace">
                          {transaction.receiverId}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Method name: </span>
                        <span className="font-monospace">
                          {action.params.methodName}
                        </span>
                      </div>
                      {action.params.deposit &&
                        action.params.deposit !== "0" && (
                          <div>
                            <span className="text-secondary">Deposit: </span>
                            <span className="font-monospace">
                              {displayNear(action.params.deposit)}
                            </span>
                          </div>
                        )}
                      <div>
                        <span className="text-secondary">Gas: </span>
                        <span className="font-monospace">
                          {displayGas(action.params.gas || TGas.mul(30))}
                        </span>
                      </div>
                      <Markdown text={jsonMarkdown(action.params.args)} />
                    </>
                  )}

                  {action.type === "DeleteKey" && (
                    <>
                      <div>
                        <span className="text-secondary">Public key: </span>
                        <span className="font-monospace">
                          {action.params.publicKey}
                        </span>
                      </div>
                    </>
                  )}

                  {action.type === "Stake" && (
                    <>
                      <div>
                        <span className="text-secondary">Public key: </span>
                        <span className="font-monospace">
                          {action.params.publicKey}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Amount: </span>
                        <span className="font-monospace">
                          {formatNearAmount(action.params.stake)} NEAR
                        </span>
                      </div>
                    </>
                  )}

                  {action.type === "DeployContract" && (
                    <>
                      <div>
                        <span className="text-secondary">Code:</span>
                        <span className="font-monospace">
                          {action.params.code}
                        </span>
                      </div>
                    </>
                  )}

                  {action.type === "DeleteAccount" && (
                    <>
                      <div>
                        <span className="text-secondary">Beneficiary id:</span>
                        <span className="font-monospace">
                          {action.params.beneficiaryId}
                        </span>
                      </div>
                    </>
                  )}

                  {action.type === "Transfer" && (
                    <>
                      <div>
                        <span className="text-secondary">Receiver: </span>
                        <span className="font-monospace">
                          {transaction.receiverId}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Amount: </span>
                        <span className="font-monospace">
                          {formatNearAmount(action.params.deposit)} NEAR
                        </span>
                      </div>
                    </>
                  )}

                  {action.type === "AddKey" && (
                    <>
                      <div>
                        <span className="text-secondary">Public key: </span>
                        <span className="font-monospace">
                          {action.params.publicKey}
                        </span>
                      </div>

                      {action.params.accessKey.permission === "FullAccess" ? (
                        <div>
                          <span className="font-weight-bold">
                            Carefully! You add a full access key; with this key
                            you can sign any transaction on behalf of your
                            account. The key has full access to your tokens.
                          </span>
                        </div>
                      ) : (
                        <>
                          <div>
                            <span className="text-secondary">Receiver: </span>
                            <span className="font-monospace">
                              {action.params.accessKey.permission.receiverId}
                            </span>
                          </div>

                          <div>
                            <span className="text-secondary">Methods: </span>
                            <span className="font-monospace">
                              {action.params.accessKey.permission.methodNames?.join(
                                ", "
                              ) || "All non-payable methods"}
                            </span>
                          </div>

                          <div>
                            <span className="text-secondary">Allowance: </span>
                            <span className="font-monospace">
                              {action.params.accessKey.permission.allowance
                                ? formatNearAmount(
                                    action.params.accessKey.permission.allowance
                                  )
                                : "0.25"}
                              {" NEAR"}
                            </span>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            near.sendTransactions(transactions).then(() => {
              setLoading(false);
              onHide();
            });
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
    </Modal>
  );
}
