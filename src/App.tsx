import "./App.css";
import { ItemAndCharacterProvider } from "./context/ItemAndCharacterContext";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { ItemsPage } from "./components/ItemsPage";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

function App(): React.JSX.Element {
  return (
    <>
      <AuthContextProvider>
        <ItemAndCharacterProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/home" element={<ItemsPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ItemAndCharacterProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
