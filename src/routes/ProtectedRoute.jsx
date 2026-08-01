import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/UseCurrentUser";

function ProtectedRoute({ children }) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;