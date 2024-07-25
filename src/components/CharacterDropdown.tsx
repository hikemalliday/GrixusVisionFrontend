import React, { KeyboardEventHandler } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";

function CharacterDropdown(): React.JSX.Element {
  const labelProps = {
    sx: {
      color: "white",
      padding: 0,
      margin: 0,
      "@media (max-width: 300px)": {
        fontSize: "small",
        marginLeft: "50px",
      },
    },
  };
  const { handleQueryPagination } = useItemAndCharacterContext();
  const [labelText, setLabelText] = React.useState("characters");
  const { charactersArray, setCharacterDropdownSelect } =
    useItemAndCharacterContext();
  const handleChange = (charName: string) => {
    setCharacterDropdownSelect(charName);
  };

  const handleEnter: KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLDivElement
  > = (e) => {
    if (e.key === "Enter") {
      handleQueryPagination();
    }
  };

  React.useEffect(() => {
    const updateLabelText = () => {
      if (window.innerWidth < 300) {
        setLabelText("Chars");
      } else {
        setLabelText("Characters");
      }
    };
    updateLabelText();
    window.addEventListener("resize", updateLabelText);
    return () => window.removeEventListener("resize", updateLabelText);
  }, []);

  return (
    <Autocomplete
      id="auto-complete"
      autoComplete
      options={charactersArray}
      includeInputInList
      onChange={(_event, value) => handleChange(value as string)}
      onKeyDown={handleEnter}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelText}
          variant="standard"
          InputLabelProps={labelProps}
          sx={{
            input: {
              color: "white",
              padding: "0",
              fontSize: "smaller",
              display: "flex",
              alignItems: "flex-end",
            },
          }}
        />
      )}
    />
  );
}

export default CharacterDropdown;
