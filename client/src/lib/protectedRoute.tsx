import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isValid } from "./checkValidToken";

interface protectedRoutes {
  children: ReactNode;
}

export const ProtectedRoutes: React.FC<protectedRoutes> = ({ children }) => {
  const user: string | null = localStorage.getItem("authToken");
  if (!isValid(user) && !user) {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" replace />;
  }
  return children;
};
