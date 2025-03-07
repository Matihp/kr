import { Router } from 'express';
import { ProposalController } from '../controllers/proposalController';
import { validate } from '../middleware/validationMiddleware';
import { getUserType, isFreelancer, isRecruiter } from '../middleware/userTypeMiddleware';
import { createProposalSchema, updateProposalStatusSchema } from '../validators/proposalValidators';

const router = Router();
const proposalController = new ProposalController();

router.post(
  '/',
  isFreelancer,
  validate(createProposalSchema),
  proposalController.createProposal.bind(proposalController)
);

router.patch(
  '/:proposalId/status',
  isRecruiter,
  validate(updateProposalStatusSchema),
  proposalController.updateProposalStatus.bind(proposalController)
);

router.get(
  '/gig/:gigId',
  isRecruiter,
  proposalController.getGigProposals.bind(proposalController)
);

router.get(
  '/my-proposals',
  isFreelancer,
  proposalController.getFreelancerProposals.bind(proposalController)
);

router.get(
  '/:proposalId',
  getUserType,
  proposalController.getProposalById.bind(proposalController)
);

export default router;