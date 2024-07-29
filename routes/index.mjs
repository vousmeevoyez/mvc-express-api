import express from "express";
import itemRoutes from "./itemRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import userProfileRoutes from "./userProfileRoutes.mjs";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/items", itemRoutes);
router.use("/user_profiles", userProfileRoutes);

export default router;
