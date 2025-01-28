import { Project } from '../models/projectModel';
import { Skill } from '../models/skillModel';
import { AppDataSource } from '../config/data-source';
import { ProjectResponseDto } from '../dtos/projectDto/projectResponseDto';
import { CreateProjectDto } from '../dtos/projectDto/createProjectDto';
import { UpdateProjectDto } from '../dtos/projectDto/updateProjectDto';
import { NotFoundError, UnauthorizedError } from '../utils/errorUtils';

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface FindAllOptions {
  page?: number;
  pageSize?: number;
  skillIds?: string[];
}

export class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project);
  private skillRepository = AppDataSource.getRepository(Skill);

  async findAll(options: FindAllOptions = {}): Promise<PaginatedResponse<ProjectResponseDto>> {
    const {
      page = 1,
      pageSize = 9,
      skillIds = []
    } = options;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user')
      .leftJoinAndSelect('project.skills', 'skills')
      .select([
        'project',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.avatarSrc',
        'skills'
      ]);

    if (skillIds.length > 0) {
      queryBuilder.andWhere('skills.id IN (:...skillIds)', { skillIds });
    }

    // Calcular total y aplicar paginación
    const total = await queryBuilder.getCount();
    const totalPages = Math.ceil(total / pageSize);

    const projects = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return {
      items: projects,
      total,
      page,
      pageSize,
      totalPages
    };
  }
  
    async findById(id: string): Promise<ProjectResponseDto> {
      const project = await this.projectRepository.findOne({
        where: { id },
        relations: ['user', 'skills'],
        select: {
          user: {
            id: true,
            firstName: true,
            lastName: true,
            avatarSrc: true
          }
        }
      });
  
      if (!project) {
        throw new NotFoundError('Proyecto no encontrado');
      }
  
      return project;
    }
  
    private async getProjectEntity(id: string): Promise<Project> {
      const project = await this.projectRepository.findOne({
        where: { id },
        relations: ['user', 'skills']
      });
  
      if (!project) {
        throw new NotFoundError('Proyecto no encontrado');
      }
  
      return project;
    }
  
    async create(dto: CreateProjectDto, userId: string): Promise<ProjectResponseDto> {
      const skills = await this.skillRepository
        .createQueryBuilder('skill')
        .where('skill.id IN (:...skillIds)', { skillIds: dto.skillIds })
        .getMany();
  
      const newProject = this.projectRepository.create({
        ...dto,
        skills,
        user: { id: userId },
        likes: 0
      });
  
      await this.projectRepository.save(newProject);
  
      return this.findById(newProject.id);
    }
  
    async update(id: string, dto: UpdateProjectDto, userId: string): Promise<ProjectResponseDto> {
      const project = await this.getProjectEntity(id);
  
      if (project.user.id !== userId) {
        throw new UnauthorizedError('No autorizado para actualizar este proyecto');
      }
  
      let skills = project.skills;
      if (dto.skillIds) {
        skills = await this.skillRepository
          .createQueryBuilder('skill')
          .where('skill.id IN (:...skillIds)', { skillIds: dto.skillIds })
          .getMany();
      }
  
      const updatedProject = await this.projectRepository.save({
        ...project,
        ...dto,
        skills
      });
  
      return this.findById(updatedProject.id);
    }
  
    async delete(id: string, userId: string): Promise<void> {
      const project = await this.getProjectEntity(id);
  
      if (project.user.id !== userId) {
        throw new UnauthorizedError('No autorizado para eliminar este proyecto');
      }
  
      await this.projectRepository.remove(project);
    }
  
    async incrementLikes(id: string): Promise<ProjectResponseDto> {
      const project = await this.getProjectEntity(id);
      project.likes = (project.likes || 0) + 1;
      await this.projectRepository.save(project);
      
      return this.findById(id);
    }
  }
