import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TableView from "../TableView";

describe("TableView tests", () => {
  it("renders TableView component", () => {
    const { getByText } = render(<TableView />);
    expect(getByText("TableView")).toBeInTheDocument();
  });
});
