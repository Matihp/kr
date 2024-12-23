import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Project } from '../models/projectModel';

const projectRepository = AppDataSource.getRepository(Project);

export const listAllProjects = async (req: Request, res: Response) => {
    try {
        // Obtener todos los proyectos
        const projects = await projectRepository.find();

        res.status(200).json({ projects });
    } catch (error) {
        console.error('Error listing all projects:', error);
        res.status(500).json({ message: 'Error listing all projects' });
    }
};

