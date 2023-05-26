import { Widget } from "./Widget";
import React, { createContext } from "react";
import { useMainnetNear } from "../data/near";

export const NearOverrideContext = createContext(null)

export const MainnetWidget = (props) => {
  const near = useMainnetNear();

  return (
    <NearOverrideContext.Provider value={near}>
      <Widget {...props} />
    </NearOverrideContext.Provider>
  );
}