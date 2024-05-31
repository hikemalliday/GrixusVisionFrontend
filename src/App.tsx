import "./App.css";
import Header from "./components/Header";
import TableView from "./components/TableView";
import { ItemAndCharacterProvider } from "./context/ItemAndCharacterContext";

function App(): React.JSX.Element {
  return (
    <>
      <ItemAndCharacterProvider>
        <Header />
        <TableView />
      </ItemAndCharacterProvider>
    </>
  );
}

export default App;
