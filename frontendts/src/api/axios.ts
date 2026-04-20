import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// 🔹 Create instance
const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }
);

// 🔥 Handle redirect from backend
API.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    if (res.data?.redirect) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = res.data.redirect;
    }

    return res;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default API;