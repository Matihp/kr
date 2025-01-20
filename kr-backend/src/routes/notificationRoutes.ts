import express from 'express';
import { getUserNotifications, markAllAsRead, markAsRead } from "../controllers/notificationController";

const router = express.Router();

router.get('/user/:userId', getUserNotifications);
router.put('/:id/read', markAsRead);
router.put('/user/:userId/read-all', markAllAsRead);

export default router;