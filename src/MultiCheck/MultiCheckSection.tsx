import React, { FC } from "react";
import { Option } from "./MultiCheck";
import "./MultiCheck.css";

type SectionProps = {
  children: React.ReactNode;
  handleSelectItemClickEvent: (event: React.MouseEvent<HTMLElement>) => void;
};

export const MultiCheckSection: FC<SectionProps> = ({
  handleSelectItemClickEvent,
  children,
}) => {
  return (
    <div className="multi-check-section" onClick={handleSelectItemClickEvent}>
      {children}
    </div>
  );
};
