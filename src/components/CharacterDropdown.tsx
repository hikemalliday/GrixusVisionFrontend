import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";

function CharacterDropdown(): React.JSX.Element {
  const [labelText, setLabelText] = React.useState("characters");
  const { charactersArray, setCharacterDropdownSelect } =
    useItemAndCharacterContext();
  const handleChange = (charName: string) => {
    setCharacterDropdownSelect(charName);
  };

  React.useEffect(() => {
    const updateLabelText = () => {
      if (window.innerWidth < 300) {
        setLabelText("Chars");
      } else {
        setLabelText("Characters");
      }
    };
    // Set the label text initially
    updateLabelText();

    // Update the label text on window resize
    window.addEventListener("resize", updateLabelText);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateLabelText);
  }, []);
  return (
    <Autocomplete
      id="auto-complete"
      autoComplete
      options={charactersArray}
      includeInputInList
      onChange={(_event, value) => handleChange(value as string)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelText}
          variant="standard"
          InputLabelProps={{
            sx: {
              color: "white",
              padding: 0,
              margin: 0,
              "@media (max-width: 300px)": {
                fontSize: "small",
                marginLeft: "50px",
              },
            },
          }}
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
