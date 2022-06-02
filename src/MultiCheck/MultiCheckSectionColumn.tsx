import React from "react";
import { Option } from "./MultiCheck";
import "./MultiCheck.css";

type SectionColumnProps = {
  columnOptions: Option[];
  render: (props: Option) => React.ReactNode;
};

export const MultiCheckSectionColumn: React.FC<SectionColumnProps> = ({
  columnOptions,
  render,
}) => {
  return (
    <div className="multi-check-section-column">
      {!!columnOptions && columnOptions.map((item: Option) => render(item))}
    </div>
  );
};
