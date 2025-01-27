import express from 'express';
import { NewsController } from '../controllers/newsController';

const router = express.Router();
const newsController = new NewsController();

router.get('/', newsController.getNews);
router.get('/:id', newsController.getNewsById);
router.post('/', newsController.createNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

export default router;

