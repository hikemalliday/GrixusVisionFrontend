import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactElement,
  type ReactNode,
} from "react";
import { itemsArrayFixture } from "../fixtures";
import { queryItems } from "../helper";

export interface IItem {
  charName: string;
  charGuild: string;
  itemName: string;
  itemCount: string;
  itemLocation: string;
}

export interface IItemAndCharacterContextType {
  itemsArrayMaster: IItem[];
  setItemsArrayMaster: React.Dispatch<React.SetStateAction<IItem[]>>;
  itemsArray: IItem[];
  setItemsArray: React.Dispatch<React.SetStateAction<IItem[]>>;
  charactersArray: string[];
  setCharactersArray: React.Dispatch<React.SetStateAction<string[]>>;
  characterDropdownSelect: string;
  setCharacterDropdownSelect: React.Dispatch<React.SetStateAction<string>>;
  characterDropdownPagination: string;
  setCharacterDropdownPagination: React.Dispatch<React.SetStateAction<string>>;
  searchBarInput: string;
  setSearchBarInput: React.Dispatch<React.SetStateAction<string>>;
  searchBarInputPagination: string;
  setSearchBarInputPagination: React.Dispatch<React.SetStateAction<string>>;
  handleQuery: CallableFunction;
  handleQueryPagination: CallableFunction;
  resetItemsArray: CallableFunction;
  dbFile: string;
  setDbFile: React.Dispatch<React.SetStateAction<string>>;
}

export const ItemAndCharacterContext =
  createContext<IItemAndCharacterContextType | null>(null);

export const ItemAndCharacterProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactElement | null => {
  const [itemsArrayMaster, setItemsArrayMaster] = useState(itemsArrayFixture);
  const [itemsArray, setItemsArray] = useState(itemsArrayFixture);
  const [charactersArray, setCharactersArray] = useState(["ALL"]);
  const [characterDropdownSelect, setCharacterDropdownSelect] = useState("ALL");
  const [searchBarInput, setSearchBarInput] = useState("");
  const [dbFile, setDbFile] = useState("");
  const [searchBarInputPagination, setSearchBarInputPagination] = useState("");
  const [characterDropdownPagination, setCharacterDropdownPagination] =
    useState("ALL");

  const handleQuery = () => {
    setItemsArray(
      queryItems(characterDropdownSelect, searchBarInput, itemsArrayMaster)
    );
  };

  const handleQueryPagination = () => {
    setCharacterDropdownPagination(characterDropdownSelect);
    setSearchBarInputPagination(searchBarInput);
  };

  const resetItemsArray = (): void => {
    setItemsArray([...itemsArrayMaster]);
  };

  // Query on dropdown change
  useEffect(() => {
    handleQuery();
  }, [characterDropdownSelect]);

  return (
    <ItemAndCharacterContext.Provider
      value={{
        itemsArrayMaster,
        setItemsArrayMaster,
        itemsArray,
        setItemsArray,
        charactersArray,
        setCharactersArray,
        characterDropdownSelect,
        setCharacterDropdownSelect,
        searchBarInput,
        setSearchBarInput,
        handleQuery,
        handleQueryPagination,
        resetItemsArray,
        dbFile,
        setDbFile,
        searchBarInputPagination,
        setSearchBarInputPagination,
        characterDropdownPagination,
        setCharacterDropdownPagination,
      }}
    >
      {children}
    </ItemAndCharacterContext.Provider>
  );
};

export const useItemAndCharacterContext = (): IItemAndCharacterContextType => {
  const context = useContext(ItemAndCharacterContext);
  if (context == null) {
    throw new Error(
      "ItemAndCharacterContext must be used within an ItemAndCharacterProvider"
    );
  }
  return context;
};
