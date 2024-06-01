import "@testing-library/jest-dom";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CharacterDropdown from "../CharacterDropdown";
import { ItemAndCharacterProvider } from "../../context/ItemAndCharacterContext";

const component = (
  <ItemAndCharacterProvider>
    <CharacterDropdown />
  </ItemAndCharacterProvider>
);

describe("CharacterDropdown tests", () => {
  it("clicking dropdown shows character choices", async () => {
    const { getByText, getByRole } = render(component);
    const dropDown = getByRole("combobox");
    await act(async () => {
      fireEvent.mouseDown(dropDown);
    });
    await waitFor(() => {
      expect(getByText("ALL")).toBeInTheDocument();
    });
  });
});
