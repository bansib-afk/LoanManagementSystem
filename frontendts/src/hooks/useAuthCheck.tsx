import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

// 🔹 Optional: define User type (if needed later)
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const useAuthCheck = (): void => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    // ⚠️ Safe parsing
    const user: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const publicRoutes: string[] = [
      "/",
      "/login",
      "/register",
      "/forgot",
      "/about",
    ];

    // ✅ Skip public routes
    if (publicRoutes.includes(location.pathname)) return;

    // ❌ If auth broken
    if (!token || !user) {
      // 🔥 Fire and forget
      if (token) {
        API.post("/auth/force-logout", {
          accessToken: token,
        }).catch(() => {});
      }

      // 🧹 Clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🔁 Redirect
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);
};

export default useAuthCheck;