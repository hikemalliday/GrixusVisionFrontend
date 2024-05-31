import { Button } from "@mui/material";
import React, { useState, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import {
  useItemAndCharacterContext,
  type IItem,
} from "../context/ItemAndCharacterContext";
import { sortColumn } from "./helper";
import { type ColumnName } from "../types";

function TableView(): React.JSX.Element {
  const [sortDirections, setSortDirections] = useState({
    charName: false,
    charGuild: false,
    itemName: false,
    itemCount: false,
    itemLocation: false,
  });

  const { itemsArray, setItemsArray, charactersArray, setCharactersArray } =
    useItemAndCharacterContext();

  const sortTable = (colName: ColumnName, data: IItem[]): void => {
    setSortDirections((prevSortDirections) => ({
      ...prevSortDirections,
      [colName]: !prevSortDirections[colName],
    }));
    const sortedColumn = sortColumn(colName, data, sortDirections[colName]);
    setItemsArray(sortedColumn);
  };

  const columns = useMemo(
    () => [
      { Header: "charGuild", accessor: "charGuild" },
      { Header: "charName", accessor: "charName" },
      { Header: "itemName", accessor: "itemName" },
      { Header: "itemCount", accessor: "itemCount" },
      { Header: "itemLocation", accessor: "itemLocation" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data: itemsArray,
      initialState: { pageIndex: 0, pageSize: 100 },
    },
    usePagination
  );
  const { pageIndex } = state;

  return (
    <>
      <div className="table-container">
        <div className="page-nums">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </div>
        <div className="page-buttons">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="button"
            variant="outlined"
          >
            &lt;
          </Button>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="button"
            variant="outlined"
          >
            &gt;
          </Button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      onClick={() =>
                        sortTable(column.render("Header"), itemsArray)
                      }
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableView;
