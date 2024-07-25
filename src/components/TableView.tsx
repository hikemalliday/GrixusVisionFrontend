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

  const handleColClick = (col: string): void => {
    setActiveColumn(col);
  };

  useEffect(() => {
    if (charNamesResponse.data !== undefined) {
      const charNames = ["ALL", ...charNamesResponse.data];
      setCharactersArray(charNames);
    }
  }, [isCharNamesLoading]);

  const headersMap = {
    item: "itemName",
    name: "charName",
    count: "itemCount",
    location: "itemLocation",
    guild: "charGuild",
  };

  const table = (itemsArray: IItem[]): React.ReactElement => {
    const headers = () => {
      return (
        <tr className="headers">
          {Object.keys(headersMap).map((key) => (
            <th
              // @ts-ignore
              onClick={(e) => handleColClick(headersMap[e.target.innerText])}
              key={key}
              className={key === "guild" ? "charguild" : ""}
            >
              {key}
            </th>
          ))}
        </tr>
      );
    };
    const cells = (itemsArray: IItem[]): React.ReactElement => {
      return (
        <>
          {itemsArray.map((item, i) => (
            <tr className={i % 2 == 0 ? "row-even" : "row-odd"} key={i}>
              <td>{item.itemName}</td>
              <td>{item.charName}</td>
              <td>{item.itemCount}</td>
              <td>{item.itemLocation}</td>
              <td className="charguild">{item.charGuild}</td>
            </tr>
          ))}
        </>
      );
    };
    return (
      <table className="table-container">
        <tbody>
          {headers()}
          {cells(itemsArray)}
        </tbody>
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
