import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 Handle redirect from backend
API.interceptors.response.use(
  (res) => {
    if (res.data?.redirect) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = res.data.redirect;
    }

    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;