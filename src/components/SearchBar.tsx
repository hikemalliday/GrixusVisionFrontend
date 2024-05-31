import React from "react";
import TextField from "@mui/material/TextField";

function SearchBar(): React.JSX.Element {
  return (
    <>
      <TextField
        size="small"
        id="outlined-basic"
        label="Item Search"
        variant="outlined"
        fullWidth
      />
    </>
  );
}

export default SearchBar;
