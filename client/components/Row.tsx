import React from "react";
import { FlexProps } from "../interfaces/flex";

const Row = ({ className, children }: FlexProps) => {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
};

export default Row;
