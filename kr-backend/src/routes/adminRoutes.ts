import express from 'express';
import { isAdmin } from '../middleware/authMiddleware';
import { createUser, deleteUser } from '../controllers/AdminController';

const router = express.Router();

router.delete('/users/:id', isAdmin, deleteUser);
router.post('/users', isAdmin, createUser);

export default router;
