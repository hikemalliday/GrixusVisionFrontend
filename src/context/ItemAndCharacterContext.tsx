import React, {
  createContext,
  useState,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";

import { itemsArrayFixture } from "../fixtures";

export interface IItem {
  charName: string;
  charGuild: string;
  itemName: string;
  itemCount: string;
  itemLocation: string;
}

export interface IItemAndCharacterContextType {
  itemsArray: IItem[];
  setItemsArray: React.Dispatch<React.SetStateAction<IItem[]>>;
  charactersArray: string[];
  setCharactersArray: React.Dispatch<React.SetStateAction<string[]>>;
}

// Is null better than undefined here?
export const ItemAndCharacterContext =
  createContext<IItemAndCharacterContextType | null>(null);

export const ItemAndCharacterProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactElement | null => {
  const [itemsArray, setItemsArray] = useState(itemsArrayFixture);
  const [charactersArray, setCharactersArray] = useState(["ALL"]);

  return (
    <ItemAndCharacterContext.Provider
      value={{
        itemsArray,
        setItemsArray,
        charactersArray,
        setCharactersArray,
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
