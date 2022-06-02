import "./MultiCheck.css";

import React, { useEffect, FC, useId, useMemo, useCallback } from "react";
import _ from "lodash/fp";
import {
  getColumnDataStruct,
  fillFakeDataForColumnDataStruct,
  getRenderData,
} from "./utils";
import { MultiCheckSection } from "./MultiCheckSection";
import { MultiCheckHeader } from "./MultiCheckHeader";
import { MultiCheckSectionColumn } from "./MultiCheckSectionColumn";
import { MultiCheckSectionColumnItem } from "./MultiCheckSectionColumnItem";
import { result } from "lodash";

export type Option = {
  label: string;
  value: string;
};

type ColumnOptions = Option[];

const allOption: Option[] = [
  {
    label: "Select All",
    value: "select-all",
  },
];

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
  const { onRender, onChange, columns, options, values } = props;

  {
    // NOTE Don't modify the code block, it can be considered as a performance hint,
    //      you need to find a way to avoid triggering it infinitely
    console.log("### > MultiCheck");
    useEffect(() => {
      onRender();
    });
  }

  const ID = useId();

  const selectOptions: Option[] = useMemo(() => {
    return options.filter((item) => values?.includes(item.value));
  }, [values, options]);

  const columnsData: ColumnOptions[] = useMemo(() => {
    const opts = [...allOption, ...options];
    const getRenderDataCurry = _.curry(getRenderData)(opts);
    return _.compose(
      getRenderDataCurry,
      fillFakeDataForColumnDataStruct,
      getColumnDataStruct
    )(opts, columns as number);
  }, [columns, options]);

  const handleSelectItemClickEvent = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const type: string = _.prop("target.type", event);
      const checked: boolean = _.prop("target.checked", event);
      const dataItem: Option =
        type == "checkbox" &&
        JSON.parse(_.prop("target.attributes[data-item][value]", event));

      if (type == "checkbox" && dataItem.value === "select-all" && checked) {
        onChange!([...allOption, ...options]);
      } else if (
        type == "checkbox" &&
        dataItem.value === "select-all" &&
        !checked
      ) {
        onChange!([]);
      } else if (type == "checkbox" && checked) {
        const result: Option[] = [...selectOptions];
        // add selected option into selectOptions
        result.push(dataItem);
        // check the option count to judge whether to select option all
        if (options.length === result.length) {
          result.push(...allOption);
        }
        onChange!(result);
      } else if (type == "checkbox" && !checked) {
        const result: Option[] = [...selectOptions];
        let shouldRemoveTwoOptions: boolean = false; // if true, then remove select-all option and unchecked option

        if (options.length === result.length - 1) {
          shouldRemoveTwoOptions = true;
        }
        onChange!(
          selectOptions.filter((item) => {
            if (shouldRemoveTwoOptions) {
              return (
                item.value !== _.prop("0.value", allOption) &&
                item.value !== dataItem.value
              );
            }
            return item.value !== dataItem.value;
          })
        );
      }
    },
    [onChange, selectOptions, options]
  );

  const isSelected = useCallback(
    (item: Option) => {
      const { label, value } = item;
      // when all other options are selected except checkbox 'Select All', then checkbox 'Select All' should be checked status
      const shouldSelectAllOption: boolean =
        _.compose(_.eq(label), _.prop("0.label"))(allOption) &&
        values?.length === options.length;
      const shouldSelectOption: boolean = values?.includes(value) || false;
      return shouldSelectOption || shouldSelectAllOption;
    },

    [values, options]
  );

  return (
    <div className="multi-check">
      <div className="multi-check-list-board">
        <MultiCheckHeader>{props.label}</MultiCheckHeader>
        <MultiCheckSection
          handleSelectItemClickEvent={handleSelectItemClickEvent}
        >
          {!!columnsData &&
            columnsData.map((columnOptions, i) => {
              return (
                <MultiCheckSectionColumn
                  key={`${ID}-${i}`}
                  columnOptions={columnOptions}
                  render={(item: Option) => {
                    return (
                      <MultiCheckSectionColumnItem
                        key={`${ID}-${item.value}`}
                        isSelected={isSelected}
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
