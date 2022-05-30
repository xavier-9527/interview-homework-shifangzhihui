import { Option } from "./MultiCheck";

type ArrayInfo<T> = {
  len: T;
  count: T;
};

type ColumnDataInfo<T> = {
  max: ArrayInfo<T>;
  min: ArrayInfo<T>;
};

type ChildArray = any[];

export function getColumnDataStruct(
  options: Option[],
  column: number
): ColumnDataInfo<number> {
  column = column || 1;
  const optionsLen: number = options.length;
  const columnDataStruct: ColumnDataInfo<number> = {
    max: {
      len: column,
      count: 1,
    },
    min: {
      len: 0,
      count: 0,
    },
  };

  if (column >= optionsLen) {
    columnDataStruct.max.len = 1;
    columnDataStruct.max.count = optionsLen;
  } else if (optionsLen % column === 0) {
    columnDataStruct.max.len = Math.ceil(optionsLen / column);
    columnDataStruct.max.count = column;
  } else if (optionsLen % column !== 0) {
    columnDataStruct.max.len = Math.ceil(optionsLen / column);
    columnDataStruct.max.count = optionsLen % column;
    columnDataStruct.min.len = Math.ceil(optionsLen / column) - 1;
    columnDataStruct.min.count = column - (optionsLen % column);
  }
  return columnDataStruct;
}

export function fillFakeDataForColumnDataStruct(
  columnDataStruct: ColumnDataInfo<number>
): ChildArray[] {
  const result: ChildArray[] = [];
  const maxLen: number = columnDataStruct.max.len;
  const maxCount: number = columnDataStruct.max.count;
  const minLen: number = columnDataStruct.min.len;
  const minCount: number = columnDataStruct.min.count;
  for (let i = 0; i < maxCount; i++) {
    result.push(new Array(maxLen).fill(1));
  }

  if (minCount !== 0) {
    for (let i = 0; i < minCount; i++) {
      result.push(new Array(minLen).fill(1));
    }
  }
  return result;
}

export function getRenderData(
  options: Option[],
  columnData: ChildArray[]
): ChildArray[] {
  const optionsCy: Option[] = [...options];
  const result: ChildArray[] = [...columnData];
  const len = columnData.length;

  for (let i = 0; i < len; i++) {
    const arr = columnData[i];
    const childLen = arr.length;
    for (let j = 0; j < childLen; j++) {
      arr.shift();
      arr.push(optionsCy.shift());
    }
  }

  return columnData;
}
