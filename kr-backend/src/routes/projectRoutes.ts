import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { CreateProjectDto } from '../dtos/projectDto/createProjectDto';
import { UpdateProjectDto } from '../dtos/projectDto/updateProjectDto';
import { validate } from '../middleware/validationMiddleware';

const router = Router();
const projectController = new ProjectController();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/',
  validate(CreateProjectDto),
  projectController.createProject
);

router.put('/:id',
  validate(UpdateProjectDto),
  projectController.updateProject
);

router.delete('/:id',
  projectController.deleteProject
);

router.post('/:id/like',
  projectController.likeProject
);

export default router;
