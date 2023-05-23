import { Widget } from "./Widget";
import React from "react";
import { useMainnetNear } from "../data/near";

export const MainnetWidget = (props) => {
  const near = useMainnetNear();
  return <Widget {...props} near={near} />
}