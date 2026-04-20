import jwt from "jsonwebtoken";
import type { IUser } from "../models/User.ts";

// 🔹 Access Token
export const generateAccessToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_SECRET as string, // ✅ fix
    { expiresIn: "15m" }
  );
};

// 🔹 Refresh Token
export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET as string, // ✅ fix
    { expiresIn: "7d" }
  );
};