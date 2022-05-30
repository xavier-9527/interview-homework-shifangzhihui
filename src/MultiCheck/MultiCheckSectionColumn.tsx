import React from "react";
import { Option } from "./MultiCheck";
import "./MultiCheck.css";

type SectionColumnProps = {
  columnData: Option[];
  render: (props: Option) => React.ReactNode;
};

export const MultiCheckSectionColumn: React.FC<SectionColumnProps> = ({
  columnData,
  render,
}) => {
  return (
    <div className="multi-check-section-column">
      {!!columnData && columnData.map((item: Option) => render(item))}
    </div>
  );
};
