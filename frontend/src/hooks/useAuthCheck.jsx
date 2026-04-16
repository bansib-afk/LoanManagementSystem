import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const publicRoutes = ["/", "/login", "/register", "/forgot", "/about"];

    // ✅ Skip public routes completely
    if (publicRoutes.includes(location.pathname)) return;

    // ❌ If auth broken
    if (!token || !user) {
      // 🔥 Fire and forget (don’t block UI)
      if (token) {
        API.post("/auth/force-logout", {
          accessToken: token,
        }).catch(() => {});
      }

      // 🧹 Clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🔁 Redirect safely
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);
};

export default useAuthCheck;
