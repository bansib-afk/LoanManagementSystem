import { Navigate } from "react-router-dom";

const SmartRedirect: React.FC = () => {
  const token: string | null = localStorage.getItem("token");
  const lastPage: string | null = localStorage.getItem("lastPage");

  if (token) {
    return <Navigate to={lastPage || "/schemes"} replace />;
  }

  return <Navigate to="/login" replace />;
};

export default SmartRedirect;