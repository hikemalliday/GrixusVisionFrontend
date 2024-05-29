import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("Header tests", () => {
  it("renders header component", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Header")).toBeInTheDocument();
  });
});
