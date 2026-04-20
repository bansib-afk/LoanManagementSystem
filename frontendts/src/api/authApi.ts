import type { AxiosResponse } from "axios";
import API from "./axios";

// 🔹 Request Types
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

// 🔹 Response Types (optional but recommended)
interface AuthResponse {
  success?: boolean;
  message: string;
  accessToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// ✅ Register API
export const registerUser = (
  data: RegisterData
): Promise<AxiosResponse<AuthResponse>> => {
  return API.post("/auth/register", data);
};

// ✅ Login API
export const loginUser = (
  data: LoginData
): Promise<AxiosResponse<AuthResponse>> => {
  return API.post("/auth/login", data);
};

// ✅ Logout API
export const logoutUser = (): Promise<AxiosResponse<AuthResponse>> => {
  return API.post("/auth/logout");
};