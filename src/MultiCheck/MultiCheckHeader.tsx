import React, { FC } from "react";
import "./MultiCheck.css";

type HeaderProps = {
  children: React.ReactNode;
};
export const MultiCheckHeader: FC<HeaderProps> = function ({ children }) {
  return <div className="multi-check-header">{children}</div>;
};
