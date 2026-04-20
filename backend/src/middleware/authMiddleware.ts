import jwt from "jsonwebtoken";
import Token from "../models/Token.ts";
import { User, type IUser } from "../models/User.ts";
import type { NextFunction, Response, Request } from "express";

// 🔹 Extend Request globally OR locally
interface AuthRequest extends Request {
  user?: IUser;
}

// 🔐 Protect Route
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      success: false,
      message: "Not authorized",
    });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];

    // 🔥 Check token in DB (blacklist logic)
    const tokenDoc = await Token.findOne({
      accessToken: token,
      isValid: true,
    });

    if (!tokenDoc) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    // 🔐 VERIFY token (NOT decode)
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET as string
    ) as { id: string };

    // 🔍 Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

// 🔐 Role-Based Authorization
export const authorizeRoles = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !req.user.role) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access denied",
      });
      return;
    }

    next();
  };
};