import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

export default function ProtectedRoute() {
  const { user, loading } = UseAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}