import express from 'express';
import itemRoutes from './itemRoutes.mjs';
import userRoutes from './userRoutes.mjs';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/items', itemRoutes);

export default router;


