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
  searchBarInput: string;
  setSearchBarInput: React.Dispatch<React.SetStateAction<string>>;
  handleQuery: CallableFunction;
  resetItemsArray: CallableFunction;
  dbFile: string;
  setDbFile: React.Dispatch<React.SetStateAction<string>>;
  handleQueryParams: CallableFunction;
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

  const handleQuery = () => {
    setItemsArray(
      queryItems(characterDropdownSelect, searchBarInput, itemsArrayMaster)
    );
  };

  const resetItemsArray = (): void => {
    setItemsArray([...itemsArrayMaster]);
  };

  const handleQueryParams = (): void => {
    const params = new URLSearchParams(location.search);
    if (searchBarInput) {
      params.set("itemName", searchBarInput);
    } else {
      params.delete("itemName");
    }
    if (characterDropdownSelect) {
      params.set("charName", characterDropdownSelect);
    } else {
      params.delete("charName");
    }
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
        resetItemsArray,
        dbFile,
        setDbFile,
        handleQueryParams,
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
