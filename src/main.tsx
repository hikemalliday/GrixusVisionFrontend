import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
