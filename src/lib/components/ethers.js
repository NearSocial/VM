import React, { useContext } from "react";

export const EthersProviderContext = React.createContext(null);

export const Web3ConnectButton = (props) => {
  const ethersProviderContext = useContext(EthersProviderContext);
  const [{ wallet, connecting }, connect, disconnect] =
    ethersProviderContext?.useConnectWallet
      ? ethersProviderContext?.useConnectWallet()
      : [{}];

  return (
    <button
      className={`btn ${props.className} ${
        connecting || wallet ? "btn-outline-secondary" : "btn-outline-primary"
      }`}
      disabled={(wallet ? !disconnect : !connect) || connecting}
      onClick={() => (wallet ? disconnect?.(wallet) : connect?.())}
    >
      {connecting
        ? props.connectingLabel ?? "Connecting"
        : wallet
        ? props.disconnectLabel ?? "Disconnect Web3 Wallet"
        : props.connectLabel ?? "Connect Web3 Wallet"}
    </button>
  );
};
