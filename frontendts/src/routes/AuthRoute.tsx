import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// 🔹 Props type
interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const token: string | null = localStorage.getItem("token");

  return token ? <Navigate to="/schemes" replace /> : <>{children}</>;
};

export default AuthRoute;