import { Router } from 'express';
import { ProposalController } from '../controllers/proposalController';
import { validate } from '../middleware/validationMiddleware';
import { isFreelancer, isRecruiter } from '../middleware/userTypeMiddleware';
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
  proposalController.getGigProposals.bind(proposalController)
);

router.get(
  '/my-proposals',
  isFreelancer,
  proposalController.getFreelancerProposals.bind(proposalController)
);

router.get(
  '/:proposalId',
  proposalController.getProposalById.bind(proposalController)
);

export default router;