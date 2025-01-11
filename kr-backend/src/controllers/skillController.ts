import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Skill } from '../models/skillModel';

const skillRepository = AppDataSource.getRepository(Skill);

export const getAllSkills = async (req: Request, res: Response) => {
  const skills = await skillRepository.find();
  res.json(skills);
};

export const createSkill = async (req: Request, res: Response) => {
  const newSkill = skillRepository.create(req.body);
  const result = await skillRepository.save(newSkill);
  res.json(result);
};

export const updateSkill = async (req: Request, res: Response) => {
  const skill = await skillRepository.findOne({ where: { id: req.params.id } });
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  skillRepository.merge(skill, req.body);
  const result = await skillRepository.save(skill);
  res.json(result);
};

export const deleteSkill = async (req: Request, res: Response) => {
  const skill = await skillRepository.findOne({ where: { id: req.params.id } });
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  await skillRepository.remove(skill);
  res.json({ message: 'Skill deleted' });
};

