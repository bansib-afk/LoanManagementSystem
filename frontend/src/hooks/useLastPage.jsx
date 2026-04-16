import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLastPage = () => {
  const location = useLocation();

  useEffect(() => {
    const validRoutes = [
      "/schemes",
      "/consultancy",
      "/loan-hub",
      "/budgeting",
      "/about"
    ];

    // ✅ Save only valid protected routes
    if (validRoutes.includes(location.pathname)) {
      localStorage.setItem("lastPage", location.pathname);
    }
  }, [location.pathname]);
};

export default useLastPage;