import React, { FC } from "react";
import "./MultiCheck.css";

type SectionProps = {
  children: React.ReactNode;
};

export const MultiCheckSection: FC<SectionProps> = ({ children }) => {
  return <div className="multi-check-section">{children}</div>;
};
