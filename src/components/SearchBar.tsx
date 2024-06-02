import React, { KeyboardEventHandler } from "react";
import TextField from "@mui/material/TextField";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";
import { Input } from "@mui/material";

function SearchBar(): React.JSX.Element {
  const { setSearchBarInput, handleQuery } = useItemAndCharacterContext();
  const handleEnter: KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    if (e.key === "Enter") {
      handleQuery();
    }
  };
  return (
    <>
      <Input
        fullWidth
        placeholder="Search"
        onChange={(e) => setSearchBarInput(e.target.value)}
        onKeyDown={handleEnter}
        sx={{ input: { color: "white", padding: "0" } }}
      />
    </>
  );
}

export default SearchBar;
