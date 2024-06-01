import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Header from "../Header";
import { ItemAndCharacterProvider } from "../../context/ItemAndCharacterContext";

const component = (
  <ItemAndCharacterProvider>
    <Header />
  </ItemAndCharacterProvider>
);

describe("Header tests", () => {
  it("renders header component", () => {
    render(component);
  });
});
