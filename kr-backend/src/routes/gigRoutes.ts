import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { GigController } from "../controllers/gigController";
import { isRecruiter } from "../middleware/roleMiddleware";
import {
  createGigSchema,
  updateGigStageSchema,
} from "../validators/gigValidators";

const router = Router();
const gigController = new GigController();

router.post(
  "/",
  isRecruiter,
  validate(createGigSchema),
  gigController.createGig.bind(gigController)
);

router.get("/", gigController.getGigs.bind(gigController));

router.patch(
  "/:gigId/stages/:stageId",
  isRecruiter,
  validate(updateGigStageSchema),
  gigController.updateGigStage.bind(gigController)
);

export default router;
