import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLastPage = (): void => {
  const location = useLocation();

  useEffect(() => {
    const validRoutes: string[] = [
      "/schemes",
      "/consultancy",
      "/loan-hub",
      "/budgeting",
      "/about",
    ];

    // ✅ Save only valid routes
    if (validRoutes.includes(location.pathname)) {
      localStorage.setItem("lastPage", location.pathname);
    }
  }, [location.pathname]);
};

export default useLastPage;