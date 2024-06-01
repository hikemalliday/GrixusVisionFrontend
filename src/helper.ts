import { type IItem } from "./context/ItemAndCharacterContext";
import { ColumnName } from "./types";

export const sortColumn = (
  colName: ColumnName,
  data: IItem[],
  ascending: boolean = true
) => {
  const newArray = [...data];
  const sortedArray = newArray.sort((a, b) => {
    let comparison = 0;
    if (typeof a[colName] === "string" && typeof b[colName] === "string") {
      comparison = a[colName].localeCompare(b[colName]);
    } else {
      comparison = (a[colName] as any) - (b[colName] as any);
    }
    return ascending ? comparison : -comparison;
  });

  return sortedArray;
};

export const getCharNames = (items: IItem[]) => {
  const charNamesSet: Set<string> = new Set();
  for (const item of items) {
    charNamesSet.add(item["charName"]);
  }
  const charNames: string[] = Array.from(charNamesSet);
  charNames.sort();
  charNames.unshift("ALL");
  return charNames;
};

export const queryItems = (
  characterDropdownSelect: string,
  searchBarInput: string,
  itemsArrayMaster: IItem[]
) => {
  let newArray = [...itemsArrayMaster];
  if (characterDropdownSelect !== "ALL") {
    newArray = newArray.filter((item) => {
      return item.charName === characterDropdownSelect;
    });
  }
  newArray = newArray.filter((item) => {
    return item.itemName.includes(searchBarInput);
  });
  return newArray;
};
