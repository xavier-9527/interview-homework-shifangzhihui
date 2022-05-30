import "./MultiCheck.css";

import React, { useEffect, FC, useId } from "react";
import { MultiCheckSection } from "./MultiCheckSection";
import { MultiCheckHeader } from "./MultiCheckHeader";
import { MultiCheckSectionColumn } from "./MultiCheckSectionColumn";
import { MultiCheckSectionColumnItem } from "./MultiCheckSectionColumnItem";

const data = [
  [
    { label: "aaa", value: "111" },
    { label: "bbb", value: "222" },
  ],
  [
    { label: "ccc", value: "333" },
    { label: "ddd", value: "444" },
  ],
  [{ label: "eee", value: "555" }],
  [{ label: "fff", value: "666" }],
];
export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options. Assume no duplicated labels or values
 * @param {string[]} values - If `undefined`, makes the component in uncontrolled mode with no options checked;
 *                            if not undefined, makes the component to controlled mode with corresponding options checked.
 *                            The values CAN be duplicated or NOT in the provided options
 * @param {number} columns - default value is 1. If it's bigger than all options count, make it same as the count of all options
 * @param {Function} onChange - if not undefined, when checked options are changed, they should be passed to outside;
 *                              if undefined, the options can still be selected, but won't notify the outside
 * @param {Function} onRender - will be called if current component rendered. Determine the balance between a reasonable
 *                              render count and readable code
 */
export type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
  onRender: () => void;
};

export const MultiCheck: FC<Props> = React.memo((props) => {
  const { onRender } = props;

  {
    // NOTE Don't modify the code block, it can be considered as a performance hint,
    //      you need to find a way to avoid triggering it infinitely
    console.log("### > MultiCheck");
    useEffect(() => {
      onRender();
    });
  }

  const ID = useId();

  return (
    <div className="multi-check">
      <div className="multi-check-list-board">
        <MultiCheckHeader>{props.label}</MultiCheckHeader>
        <MultiCheckSection>
          {!!data &&
            data.map((columnData, i) => {
              return (
                <MultiCheckSectionColumn
                  key={`${ID}-${i}`}
                  columnData={columnData}
                  render={(item: Option) => {
                    return (
                      <MultiCheckSectionColumnItem
                        key={`${ID}-${item.value}`}
                        item={item}
                      />
                    );
                  }}
                />
              );
            })}
        </MultiCheckSection>
      </div>
    </div>
  );
});
