import { Router } from 'express';
import { SkillController } from '../controllers/skillController';
import { validate } from '../middleware/validationMiddleware';
import { CreateSkillDto, UpdateSkillDto } from '../dtos/skillDto';

const router = Router();
const skillController = new SkillController();

router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);

router.post('/',
  validate(CreateSkillDto),
  skillController.createSkill
);

router.put('/:id',
  validate(UpdateSkillDto),
  skillController.updateSkill
);

router.delete('/:id',
  skillController.deleteSkill
);

export default router;
