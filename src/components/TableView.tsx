import React, { useEffect } from "react";
import {
  useItemAndCharacterContext,
  type IItem,
} from "../context/ItemAndCharacterContext";
import { useItems, useCharNames } from "../requests/fetches";
import { ClipLoader } from "react-spinners";
import { PaginationComponent } from "./PaginationComponent";
import { usePagination } from "../hooks/usePagination";

function TableView(): React.JSX.Element {
  const { action } = useItems();
  const { response: charNamesResponse, isLoading: isCharNamesLoading } =
    useCharNames();

  const {
    searchBarInputPagination,
    characterDropdownSelect,
    setCharactersArray,
    activeColumn,
    setActiveColumn,
  } = useItemAndCharacterContext();

  const {
    data,
    dbFile,
    count,
    handlePageChangeIncrement,
    handlePageChangeDecrement,
    page,
    pageSize,
    isLoading,
  } = usePagination({
    action,
    itemNamePagination: searchBarInputPagination,
    charName: characterDropdownSelect,
    activeColumn,
  });

  // @ts-ignore
  const handleColClick = (col: string): void => {
    setActiveColumn(col);
  };
  // // ts-ignore
  // const testci = "";
  useEffect(() => {
    if (charNamesResponse.data !== undefined) {
      const charNames = ["ALL", ...charNamesResponse.data];
      setCharactersArray(charNames);
    }
  }, [isCharNamesLoading]);

  const table = (itemsArray: IItem[]): React.ReactElement => {
    const headers = (itemsArray: IItem[]) => {
      return (
        <thead className="col-names">
          <tr>
            {Object.keys(itemsArray[0]).map((key) => (
              <th
                // @ts-ignore
                onClick={(e) => handleColClick(e.target.innerText)}
                key={key}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
      );
    };
    const cells = (itemsArray: IItem[]): React.ReactElement => {
      return (
        <tbody>
          {itemsArray.map((item, i) => (
            <tr className={i % 2 == 0 ? "row-even" : "row-odd"} key={i}>
              <td>{item.itemName}</td>
              <td>{item.charName}</td>
              <td>{item.itemCount}</td>
              <td>{item.itemLocation}</td>
              <td>{item.charGuild}</td>
            </tr>
          ))}
        </tbody>
      );
    };
    return (
      <table className="table-container">
        {headers(itemsArray)}
        {cells(itemsArray)}
      </table>
    );
  };

  if (isLoading || isCharNamesLoading) return <ClipLoader />;

  if (data.length === 0) {
    return <div className="no-results">NO RESULTS</div>;
  }

  return (
    <>
      <div>
        {`dbFile: ${dbFile}`}
        <PaginationComponent
          handlePageChangeIncrement={handlePageChangeIncrement}
          handlePageChangeDecrement={handlePageChangeDecrement}
          count={count}
          page={page}
          pageSize={pageSize}
        />
      </div>
      {table(data as IItem[])}
    </>
  );
}

export default TableView;
