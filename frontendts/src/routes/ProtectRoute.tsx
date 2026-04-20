import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// 🔹 Props type
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token");

  // ❌ Not logged in → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return <>{children}</>;
};

export default ProtectedRoute;