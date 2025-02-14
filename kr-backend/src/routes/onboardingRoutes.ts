import { Router } from 'express';
import { OnboardingController } from '../controllers/onboardingController';
import { checkUserJwt } from '../middleware/authMiddleware';

const router = Router();
const onboardingController = new OnboardingController();

router.post('/initialize', checkUserJwt, (req, res) => onboardingController.initializeOnboarding(req, res));
router.put('/update/:step', checkUserJwt, (req, res) => onboardingController.updateOnboarding(req, res));
router.get('/status', checkUserJwt, (req, res) => onboardingController.getOnboardingStatus(req, res));

export default router;