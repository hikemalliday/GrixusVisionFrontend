import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactElement,
  type ReactNode,
} from "react";
import { itemsArrayFixture, itemsArrayFixtureLarge } from "../fixtures";
import { getCharNames, queryItems } from "../helper";

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
}

export const ItemAndCharacterContext =
  createContext<IItemAndCharacterContextType | null>(null);

export const ItemAndCharacterProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactElement | null => {
  const [itemsArrayMaster, setItemsArrayMaster] = useState(
    itemsArrayFixtureLarge
  );
  const [itemsArray, setItemsArray] = useState(itemsArrayFixtureLarge);
  const [charactersArray, setCharactersArray] = useState(["ALL"]);
  const [characterDropdownSelect, setCharacterDropdownSelect] = useState("ALL");
  const [searchBarInput, setSearchBarInput] = useState("");

  const handleQuery = () => {
    setItemsArray(
      queryItems(characterDropdownSelect, searchBarInput, itemsArrayMaster)
    );
  };

  useEffect(() => {
    setItemsArrayMaster(itemsArrayFixtureLarge);
    setItemsArray(itemsArrayFixtureLarge);
    setCharactersArray(getCharNames(itemsArray));
  }, []);

  // Deals with dropdown change to auto query
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
