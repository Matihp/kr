import express from 'express';
import { getUsers, getUser, updateUser } from '../controllers/userController';
import { checkJwt } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', checkJwt, updateUser);

export default router;

