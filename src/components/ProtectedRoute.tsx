import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// export function ProtectedRoute(): React.JSX.Element {
//   const { authUser } = useAuthContext();
//   return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
// }

export function ProtectedRoute(): React.JSX.Element {
  const { authUser } = useAuthContext();
  if (authUser !== null) {
    return <Outlet />;
  } else {
    <Navigate to="/login" replace />;
  }
  return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
