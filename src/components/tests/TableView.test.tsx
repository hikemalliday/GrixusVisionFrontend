import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TableView from "../TableView";
import { ItemAndCharacterProvider } from "../../context/ItemAndCharacterContext";

describe("TableView tests", () => {
  it("renders fixture data into table", () => {
    const { queryAllByText } = render(
      <ItemAndCharacterProvider>
        <TableView />
      </ItemAndCharacterProvider>
    );
    expect(queryAllByText("Abashi")[0]).toBeInTheDocument();
  });
});
