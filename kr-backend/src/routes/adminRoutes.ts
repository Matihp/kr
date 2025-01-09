import express from 'express';
import { checkRole } from '../middleware/authMiddleware';
import { RoleType } from '../models/roleModel';

const router = express.Router();

router.get('/admin-only', 
  checkRole(RoleType.ADMIN),
  (req, res) => {
    res.json({ message: 'Admin access granted' });
  }
);

export default router;