import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: JSX.Element;
  accessBy: "non-authenticated" | "authenticated" | "consultant";
  user?: any;
}

const ProtectedRoute = ({ children, accessBy, user }: ProtectedRouteProps) => {
  const isAuthenticated = Boolean(user);

  if (accessBy === "non-authenticated") {
    if (!isAuthenticated) return children ? children : <Outlet />;
    return <Navigate to="/" />;
  }

  if (accessBy === "authenticated" && isAuthenticated) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
