import { Widget } from "./Widget";
import React, { useContext } from "react";
import { useMainnetNear } from "../data/near";

export const NearOverrideContext = useContext()

export const MainnetWidget = (props) => {
  const near = useMainnetNear();
  console.log(near, '<<< mainnetNear context')

  return (
    <NearOverrideContext.Provider value={near}>
      <Widget {...props} />
    </NearOverrideContext.Provider>
  );
}