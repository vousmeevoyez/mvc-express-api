import express from "express";
import authRoutes from "./authRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import userProfileRoutes from "./userProfileRoutes.mjs";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/user_profiles", userProfileRoutes);

export default router;
