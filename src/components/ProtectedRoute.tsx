import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function ProtectedRoute(): React.JSX.Element {
  const { authUser } = useAuthContext();
  return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
