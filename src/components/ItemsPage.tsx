import React from "react";
import Header from "./Header";
import TableView from "./TableView";
import { SubHeader } from "./SubHeader";

export function ItemsPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <SubHeader />
      <TableView />
    </>
  );
}
