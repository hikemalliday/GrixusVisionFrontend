import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function ProtectedRoute(): React.JSX.Element {
  const { authUser, isLoading } = useAuthContext();
  if (isLoading) {
    return <>LOADING...</>;
  }
  return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
