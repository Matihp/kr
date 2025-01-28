import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ProjectService } from '../services/projectService';
import { NotFoundError, UnauthorizedError } from '../utils/errorUtils';
import { CreateProjectDto } from '../dtos/projectDto/createProjectDto';
import { UpdateProjectDto } from '../dtos/projectDto/updateProjectDto';

export class ProjectController {
    private projectService: ProjectService;
  
    constructor() {
      this.projectService = new ProjectService();
    }
  
    public getAllProjects = async (req: Request, res: Response) => {
      try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 9;
        const skillIds = req.query.skillIds ? (req.query.skillIds as string).split(',') : [];
  
        const projects = await this.projectService.findAll({
          page,
          pageSize,
          skillIds
        });
  
        return res.json(projects);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
  
    public getProjectById = async (req: Request, res: Response) => {
      try {
        const project = await this.projectService.findById(req.params.id);
        return res.json(project);
      } catch (error) {
        if (error instanceof NotFoundError) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
  
    public createProject = async (req: Request, res: Response) => {
      try {
        const dto = plainToInstance(CreateProjectDto, req.body);
        await validateOrReject(dto);
  
        const userId = (req.user as any).id;
        const project = await this.projectService.create(dto, userId);
        
        return res.status(201).json(project);
      } catch (error) {
        if (Array.isArray(error)) {
          return res.status(400).json({ 
            message: 'Error de validación',
            errors: error.map(err => Object.values(err.constraints))
          });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
  
    public updateProject = async (req: Request, res: Response) => {
      try {
        const dto = plainToInstance(UpdateProjectDto, req.body);
        await validateOrReject(dto);
  
        const userId = (req.user as any).id;
        const project = await this.projectService.update(req.params.id, dto, userId);
        
        return res.json(project);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return res.status(403).json({ message: error.message });
        }
        if (error instanceof NotFoundError) {
          return res.status(404).json({ message: error.message });
        }
        if (Array.isArray(error)) {
          return res.status(400).json({ 
            message: 'Error de validación',
            errors: error.map(err => Object.values(err.constraints))
          });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
  
    public deleteProject = async (req: Request, res: Response) => {
      try {
        const userId = (req.user as any).id;
        await this.projectService.delete(req.params.id, userId);
        return res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return res.status(403).json({ message: error.message });
        }
        if (error instanceof NotFoundError) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
  
    public likeProject = async (req: Request, res: Response) => {
      try {
        const project = await this.projectService.incrementLikes(req.params.id);
        return res.json(project);
      } catch (error) {
        if (error instanceof NotFoundError) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
  }


