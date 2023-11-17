import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { setupExportSelectorModal } from "@near-wallet-selector/account-export";
import "@near-wallet-selector/account-export/styles.css";

import { Loading } from "../data/utils";
import { useNear } from "../data/near";

export default function ExportWallet(props) {
  const near = useNear(props.networkId);
  const [loading, setLoading] = useState(false);
  const [secrets, setSecrets] = useState(null);
  const [isModel, setModel] = useState(true);
  const [exportedToWallet, setExportedToWallet] = useState(null);
  const onHide = props.onHide;

  const openExport = async ({ accountId, secretKey }) => {
    const selector = await near.selector;
    const modal = setupExportSelectorModal(selector, {
      accounts: [{ accountId, privateKey: secretKey }],
      onComplete: ({ walletName }) => {
        setExportedToWallet(walletName);
        setModel(true);
      },
    });

    setModel(false);
    modal.show();
  };

  return (
    <Modal size="md" centered scrollable show={isModel} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Export Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {secrets == null && (
          <p>
            Generate a new mnemonic phrase to export your account to another
            wallet. It's secure because no BOS component sees your new
            passphrase.
          </p>
        )}

        {secrets != null && (
          <div>
            <p>
              The key has been added. Be sure to write down your mnemonic
              phrase, your previous mnemonic phrase is still available:
            </p>
            <SeedView>
              {secrets.seedPhrase.split(" ").map((word, i) => (
                <div key={word}>
                  {i + 1}. {word}
                </div>
              ))}
            </SeedView>

            {exportedToWallet == null && (
              <ExportWalletText>
                Now you can export the account into another wallet via export
                wisard
              </ExportWalletText>
            )}

            {exportedToWallet != null && (
              <ExportWalletText>
                You have successfully exported your account to{" "}
                {exportedToWallet}!
              </ExportWalletText>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {secrets == null && (
          <button
            className="btn btn-success"
            disabled={loading}
            onClick={async (e) => {
              if (loading) return;
              try {
                e.preventDefault();
                setLoading(true);
                const secrets = await near.exportWallet();
                setSecrets(secrets);
                setLoading(false);
              } catch (e) {
                setLoading(false);
                console.log(e);
              }
            }}
          >
            {loading && Loading} Generate key
          </button>
        )}

        {secrets != null && !exportedToWallet && (
          <button
            className="btn btn-success"
            onClick={() => openExport(secrets)}
          >
            Export to wallet
          </button>
        )}

        <button
          className="btn btn-secondary"
          disabled={loading}
          onClick={onHide}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const SeedView = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  div {
    border: 1px solid #ccc;
    border-radius: 24px;
    padding: 8px;
    text-align: center;
    font-weight: bold;
  }
`;

export const ExportWalletText = styled.p`
  padding: 0 60px;
  font-weight: bold;
  margin-top: 28px;
  margin-bottom: 0;
  text-align: center;
`;
