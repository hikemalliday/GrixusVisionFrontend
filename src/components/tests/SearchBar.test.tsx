import "@testing-library/jest-dom";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ItemAndCharacterProvider } from "../../context/ItemAndCharacterContext";
import SearchBar from "../SearchBar";

const component = (
  <ItemAndCharacterProvider>
    <SearchBar />
  </ItemAndCharacterProvider>
);

describe("SearchBar tests", () => {
  it("renders SearchBar component", async () => {
    const { getByRole, getByDisplayValue } = render(component);
    const searchBar = getByRole("textbox", { name: "Item Search" });
    act(() => {
      fireEvent.change(searchBar, { target: { value: "test" } });
    });
    await waitFor(() => {
      expect(getByDisplayValue("test")).toBeInTheDocument();
    });
  });
});
