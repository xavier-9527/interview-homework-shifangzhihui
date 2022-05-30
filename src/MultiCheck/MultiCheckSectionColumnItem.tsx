import React, { useId } from "react";
import { Option } from "./MultiCheck";
import "./MultiCheck.css";

type SectionColumnItemProps = {
  item: Option;
};

export const MultiCheckSectionColumnItem: React.FC<SectionColumnItemProps> = ({
  item,
}) => {
  const ID = useId();
  return (
    <div className="multi-check-section-column-item">
      <input type="checkbox" id={ID} name={item.label} value={item.value} />
      <label className="multi-check-section-column-item-label" htmlFor={ID}>
        {item.label}
      </label>
    </div>
  );
};