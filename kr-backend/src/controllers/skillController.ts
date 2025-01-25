import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Skill } from '../models/skillModel';
import { SkillService } from '../services/skillService';
import { plainToInstance } from 'class-transformer';
import { NotFoundError } from '../utils/errorUtils';
import { CreateSkillDto, UpdateSkillDto } from '../dtos/skillDto';

export class SkillController {
  private skillService: SkillService;

  constructor() {
    this.skillService = new SkillService();
  }

  public getAllSkills = async (_req: Request, res: Response) => {
    try {
      const skills = await this.skillService.findAll();
      return res.json(skills);
    } catch (error) {
      console.error('Error al obtener skills:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  public getSkillById = async (req: Request, res: Response) => {
    try {
      const skill = await this.skillService.findById(req.params.id);
      return res.json(skill);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  public createSkill = async (req: Request, res: Response) => {
    try {
      const dto = plainToInstance(CreateSkillDto, req.body);
      const skill = await this.skillService.create(dto);
      return res.status(201).json(skill);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Ya existe')) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  public updateSkill = async (req: Request, res: Response) => {
    try {
      const dto = plainToInstance(UpdateSkillDto, req.body);
      const skill = await this.skillService.update(req.params.id, dto);
      return res.json(skill);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof Error && error.message.includes('Ya existe')) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  public deleteSkill = async (req: Request, res: Response) => {
    try {
      await this.skillService.delete(req.params.id);
      return res.json({ message: 'Skill eliminada exitosamente' });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
}

