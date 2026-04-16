import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forceLogout
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken); // 🔥 important

// Protected Route
router.post("/logout", protect, logoutUser);

router.post("/force-logout", forceLogout)

export default router;