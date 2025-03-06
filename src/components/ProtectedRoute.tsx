import { useAppSelector } from "../app/hook";
import { Navigate, Outlet } from "react-router";

export function UserProtectedRoute() {
  const { user, loading } = useAppSelector((state) => state.auth);
  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
export function AdminProtectedRoute() {
  const { user, isAdmin, loading } = useAppSelector((state) => state.auth);
  if (loading) return <div>Loading...</div>;

  return user && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
