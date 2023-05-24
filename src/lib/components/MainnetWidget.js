import { Widget } from "./Widget";
import React from "react";
import { useMainnetNear } from "../data/near";

export const MainnetWidget = (props) => {
  const near = useMainnetNear();
  console.log(near, '<<< mainnetNear')
  return <Widget {...props} otherEnvNear={near} />
}