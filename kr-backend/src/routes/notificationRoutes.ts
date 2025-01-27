import express from 'express';
import { NotificationController } from '../controllers/notificationController';

const router = express.Router();
const notificationController = new NotificationController();

router.get('/user/:userId', notificationController.getUserNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.put('/user/:userId/read-all', notificationController.markAllAsRead);

export default router;
