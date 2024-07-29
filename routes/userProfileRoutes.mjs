/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - bio
 *       optional:
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user profile
 *         bio:
 *           type: string
 *           description: user profile bio
 *         image:
 *           type: string
 *           format: binar
 *           description: profile image file
 *       example:
 *         bio: My biography
 *         image: file url
 */

/**
 * @swagger
 * tags:
 *   name: UserProfiles
 *   description: The user profiles API
 * /api/user_profiles/{id}:
 *   post:
 *    summary: add user profile
 *    consumes:
 *      - multipart/form-data
 *    tags: [UserProfiles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: User profile bio
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *    responses:
 *      201:
 *        description: The user profile added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserProfile'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

import express from "express";
import { createUserProfile } from "../controllers/userProfileController.mjs";
import upload from "../middlewares/multer.mjs";

const router = express.Router();

router.post("/:id", upload.single("image"), createUserProfile);

export default router;
