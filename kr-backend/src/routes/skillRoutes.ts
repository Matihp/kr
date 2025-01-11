import express from 'express';
import { createSkill, deleteSkill, getAllSkills, updateSkill } from '../controllers/skillController';

const router = express.Router();

router.get('/', getAllSkills);
router.post('/create', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
