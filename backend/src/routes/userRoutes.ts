import { Router } from "express";
import { applyForManager } from "../controllers/userController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

// 🔐 User routes
router.post("/apply-manager", protect, applyForManager);

export default router;