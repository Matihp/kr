import express from 'express';
import { AdminController } from '../controllers/adminController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();
const adminController = new AdminController();

router.delete('/users/:id', isAdmin, adminController.deleteUser);
router.post('/users', isAdmin, adminController.createUser);

export default router;

