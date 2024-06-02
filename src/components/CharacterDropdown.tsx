import { TextField, Autocomplete } from "@mui/material";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";
function CharacterDropdown(): React.JSX.Element {
  const { charactersArray, setCharacterDropdownSelect } =
    useItemAndCharacterContext();
  const handleChange = (charName: string) => {
    setCharacterDropdownSelect(charName);
  };
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
          label="characters"
          variant="standard"
          InputLabelProps={{
            style: { color: "white", padding: 0, margin: 0 },
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
