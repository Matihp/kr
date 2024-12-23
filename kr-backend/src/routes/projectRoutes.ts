import { Router } from 'express';
import { listAllProjects } from '../controllers/projectController';

const router = Router();

// Ruta para listar todos los proyectos
router.get('/list-all-projects', listAllProjects);

export default router;
