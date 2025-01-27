import express from 'express';
import { checkJwt } from '../middleware/authMiddleware';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', checkJwt, userController.updateUser);

export default router;