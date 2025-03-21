import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { GigController } from "../controllers/gigController";
import { isFreelancer, isRecruiter } from "../middleware/userTypeMiddleware";
import { 
  createGigSchema, 
  createGigStageSchema, 
  updateGigStageSchema 
} from "../validators/gigValidators";

const router = Router();
const gigController = new GigController();

// Existing routes
router.post(
  "/",
  isRecruiter,
  validate(createGigSchema),
  gigController.createGig.bind(gigController)
);

router.get("/", gigController.getGigs.bind(gigController));

router.get(
  "/my-gigs",
  isRecruiter,
  gigController.getRecruiterGigs.bind(gigController)
);

router.get(
  "/participating",
  isFreelancer,
  gigController.getParticipatingGigs.bind(gigController)
);

router.get(
  "/:id",
  gigController.getGigById.bind(gigController)
);

router.put(
  "/:id",
  isRecruiter,
  validate(createGigSchema),
  gigController.updateGig.bind(gigController)
);

router.delete(
  "/:id",
  isRecruiter,
  gigController.deleteGig.bind(gigController)
);

router.get(
  "/:id/stages",
  gigController.getGigStages.bind(gigController)
);

router.get(
  "/:id/stages/:stageId",
  gigController.getGigStageById.bind(gigController)
);

router.post(
  "/:id/stages",
  isRecruiter,
  validate(createGigStageSchema),
  gigController.createGigStage.bind(gigController)
);

router.put(
  "/:id/stages/:stageId",
  isRecruiter,
  validate(updateGigStageSchema),
  gigController.updateGigStage.bind(gigController)
);

router.delete(
  "/:id/stages/:stageId",
  isRecruiter,
  gigController.deleteGigStage.bind(gigController)
);

router.patch(
  "/:gigId/stages/:stageId",
  isRecruiter,
  validate(updateGigStageSchema),
  gigController.updateGigStage.bind(gigController)
);

router.put(
  "/:id/stages-reorder",
  isRecruiter,
  gigController.reorderGigStages.bind(gigController)
);

export default router;
