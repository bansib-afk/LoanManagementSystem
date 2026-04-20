import type { Request, Response, NextFunction } from "express";

// 🔹 Custom Error Type (optional but recommended)
interface CustomError extends Error {
  statusCode?: number;
}

// 🔹 Global Error Handler
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};