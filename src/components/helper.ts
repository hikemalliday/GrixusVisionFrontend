import { type IItem } from "../context/ItemAndCharacterContext";
import { ColumnName } from "../types";

export const sortColumn = (
  colName: ColumnName,
  data: IItem[],
  ascending: boolean = true
) => {
  // Make a copy of the array using the spread operator
  const newArray = [...data];

  // Sort the copy of the array
  const sortedArray = newArray.sort((a, b) => {
    let comparison = 0;
    if (typeof a[colName] === "string" && typeof b[colName] === "string") {
      comparison = a[colName].localeCompare(b[colName]);
    } else {
      comparison = (a[colName] as any) - (b[colName] as any);
    }
    return ascending ? comparison : -comparison; // Reverse the comparison if sorting in descending order
  });

  return sortedArray; // Return the sorted array
};
