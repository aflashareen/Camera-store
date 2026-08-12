import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/UseCurrentUser";

function AdminRoute({ children }) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  if (user.blocked) {
    return <Navigate to="/blocked" />;
  }

  return children;
}

export default AdminRoute;