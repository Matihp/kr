import express from 'express';
import { updateProfile } from '../controllers/profileController';

const router = express.Router();

router.put('/update-profile/:userId', updateProfile);

export default router;
