import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// export function ProtectedRoute(): React.JSX.Element {
//   const { authUser } = useAuthContext();
//   return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
// }

export function ProtectedRoute(): React.JSX.Element {
  const { authUser } = useAuthContext();
  if (authUser !== null) {
    console.log("ProtectedRoute.if.AuthUser:");
    console.log(authUser);
    console.log("ProtectedRoute: Returning outlet...");
    return <Outlet />;
  } else {
    console.log("ProtectedRoute.Else.AuthUser:");
    console.log(authUser);
    console.log("ProtectedRoute: Navigating to /login...");
    <Navigate to="/login" replace />;
  }
  return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
