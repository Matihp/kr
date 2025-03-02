import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { GigController } from "../controllers/gigController";
import { isRecruiter } from "../middleware/userTypeMiddleware";
import { 
  createGigSchema, 
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

// New routes
router.get(
  "/my-gigs",
  isRecruiter,
  gigController.getRecruiterGigs.bind(gigController)
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

router.patch(
  "/:gigId/stages/:stageId",
  isRecruiter,
  validate(updateGigStageSchema),
  gigController.updateGigStage.bind(gigController)
);

export default router;
