import { Router } from 'express';
import { LevelProgressController } from '../controllers/levelProgressController';
import { checkJwt } from '../middleware/authMiddleware';

const router = Router();
const levelProgressController = new LevelProgressController();

router.get('/:userId', 
  checkJwt,
  levelProgressController.getUserProgress.bind(levelProgressController)
);

router.put('/:userId', 
  checkJwt,
  levelProgressController.updateUserProgress.bind(levelProgressController)
);

router.post('/:userId/remove-item', 
  checkJwt,
  levelProgressController.handleItemRemoval.bind(levelProgressController)
);

export const levelProgressRoutes = router;