/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email user
 *         password:
 *           type: string
 *           description: thepassword
 *       example:
 *         email: sampel@email.com
 *         password: password
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth API
 * /api/auth/login:
 *   post:
 *     summary: login using email password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

import express from "express";
import login from "../controllers/authController.mjs";

const router = express.Router();

router.post("/login", login);

export default router;
