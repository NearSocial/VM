import { Widget } from "./Widget";
import React, { createContext } from "react";
import { useMainnetNear } from "../data/near";

export const NearOverrideContext = createContext(null)

export const MainnetWidget = (props) => {

  return (
    <NearOverrideContext.Provider value={'mainnet'}>
      <Widget {...props} />
    </NearOverrideContext.Provider>
  );
}