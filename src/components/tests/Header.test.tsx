import "@testing-library/jest-dom";
import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("Header tests", () => {
  it("renders header component", () => {
    render(<Header />);
  });
});
