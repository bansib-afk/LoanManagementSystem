import type { Request, Response } from "express";
import { User, type IUser } from "../models/User.ts";

// 🔹 Extend Request to include user (from JWT middleware)
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// 🔹 Apply for Manager
export const applyForManager = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const user = (await User.findById(req.user.id)) as IUser | null;

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (user.managerRequest.status !== "none") {
      res.status(400).json({
        success: false,
        message: "Already applied or in process",
      });
      return;
    }

    user.managerRequest.status = "pending";
    await user.save();

    res.json({
      success: true,
      message: "Request sent to admin",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};