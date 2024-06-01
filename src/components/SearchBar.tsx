import React, { KeyboardEventHandler } from "react";
import TextField from "@mui/material/TextField";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";

function SearchBar(): React.JSX.Element {
  const { setSearchBarInput, handleQuery } = useItemAndCharacterContext();
  const handleEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      handleQuery();
    }
  };
  return (
    <>
      <TextField
        size="small"
        id="outlined-basic"
        label="Item Search"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchBarInput(e.target.value)}
        onKeyDown={handleEnter}
      />
    </>
  );
}

export default SearchBar;
