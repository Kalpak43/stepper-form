import { Loader2 } from "lucide-react";
import { useAppSelector } from "../app/hook";
import { Navigate, Outlet } from "react-router";

export function UserProtectedRoute() {
  const { user, loading } = useAppSelector((state) => state.auth);
  if (loading)
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center text-lg">
        <Loader2 className="animate-spin" />
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
export function AdminProtectedRoute() {
  const { user, isAdmin, loading } = useAppSelector((state) => state.auth);
  if (loading)
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center text-lg">
        <Loader2 className="animate-spin" />
      </div>
    );

  return user && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}
