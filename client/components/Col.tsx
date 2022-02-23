import React from "react";
import { FlexProps } from "../interfaces/flex";

const Col = ({ className, children }: FlexProps) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export default Col;
