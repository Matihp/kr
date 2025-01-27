import express from 'express';
import { ProfileController } from '../controllers/profileController';

const router = express.Router();
const profileController = new ProfileController();

router.put('/update-profile/:userId', profileController.updateProfile);

export default router;