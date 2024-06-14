import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TableView from "../TableView";
import { ItemAndCharacterProvider } from "../../context/ItemAndCharacterContext";

describe("TableView tests", () => {
  it("renders fixture data into table", () => {
    const { getByText } = render(
      <ItemAndCharacterProvider>
        <TableView />
      </ItemAndCharacterProvider>
    );
    expect(getByText("Wait")).toBeInTheDocument();
    expect(getByText("just")).toBeInTheDocument();
    expect(getByText("a")).toBeInTheDocument();
    expect(getByText("moment")).toBeInTheDocument();
    expect(getByText("please!")).toBeInTheDocument();
  });
});
