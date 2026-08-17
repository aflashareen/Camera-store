import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/UseCurrentUser";

function PublicRoute() {
  const { data: user, isLoading } = useCurrentUser();
  const role = localStorage.getItem("role");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;