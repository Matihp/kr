import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { Language } from '../models/languageModel';
import { Skill } from '../models/skillModel';
import { Project } from '../models/projectModel';
import { Certification } from '../models/certificationModel';
import { ProfileData } from '../types/profileTypes';
import { NotFoundError } from '../utils/errorUtils';
import { LevelProgressService } from './levelProgressService';
import { LevelProgress } from '../models/levelProgressModel';
import { Logger } from '../utils/loggingUtils';
import { profileDataSchema } from '../validators/profileValidation';
import { z } from 'zod';

export class ProfileService {
  private levelProgressService: LevelProgressService;
  private logger: Logger;
  
  constructor() {
    this.levelProgressService = new LevelProgressService();
    this.logger = new Logger('ProfileService');
  }

  async updateProfile(userId: string, profileData: ProfileData): Promise<{user: User, levelProgress: LevelProgress}> {
    this.logger.info('Starting profile update', { userId });

    // Validar datos con Zod
    try {
      const validatedData = profileDataSchema.parse(profileData);
      this.logger.info('Profile data validation successful');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }));
        this.logger.error('Profile data validation failed', { 
          errors: formattedErrors 
        });
        throw new Error('Profile validation failed: ' + 
          formattedErrors.map(e => `${e.field}: ${e.message}`).join(', '));
      }
      throw error;
    }

    // Iniciar transacción
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
        relations: ['languages', 'skills', 'projects', 'certifications'],
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Guardar estado anterior para verificar eliminaciones
      const previousState = {
        hasSkills: user.skills?.length > 0,
        hasLanguages: user.languages?.length > 0,
        hasProjects: user.projects?.length > 0,
        hasCertifications: user.certifications?.length > 0
      };

      // Actualizar campos básicos
      if (profileData.firstName) user.firstName = profileData.firstName;
      if (profileData.lastName) user.lastName = profileData.lastName;
      if (profileData.description) user.description = profileData.description;
      if (profileData.avatarSrc) user.avatarSrc = profileData.avatarSrc;
      if (profileData.location) user.location = profileData.location;
      if (profileData.socialNetworks)
        user.socialNetworks = profileData.socialNetworks;

      // Actualizar idiomas
      if (profileData.languages && Array.isArray(profileData.languages)) {
        this.logger.info('Processing languages update');
        const newLanguages = profileData.languages.map(lang =>
          queryRunner.manager.create(Language, { ...lang, user })
        );
        await queryRunner.manager.save(Language, newLanguages);
        user.languages = newLanguages;
      }

      // Actualizar skills
      if (profileData.skills && Array.isArray(profileData.skills)) {
        this.logger.info('Processing skills update');
        const skillNames = profileData.skills.filter(skill => 
          typeof skill === 'string' && skill.trim().length > 0
        );
        
        if (skillNames.length > 0) {
          const skills = await Promise.all(
            skillNames.map(async skillName => {
              let skill = await queryRunner.manager.findOne(Skill, { where: { name: skillName } });
              if (!skill) {
                skill = queryRunner.manager.create(Skill, { name: skillName });
                await queryRunner.manager.save(Skill, skill);
              }
              return skill;
            })
          );
          user.skills = skills.filter(skill => skill !== null);
        }
      }

      // Actualizar proyectos
      if (profileData.projects && Array.isArray(profileData.projects)) {
        this.logger.info('Processing projects update');
        
        // Obtener IDs de proyectos existentes
        const existingProjectIds = user.projects.map(p => p.id);
        
        // Obtener IDs de proyectos en la actualización
        const updatedProjectIds = profileData.projects
          .filter(p => p.id)
          .map(p => p.id as string);
        
        // Encontrar proyectos que deben eliminarse (están en existentes pero no en actualizados)
        const projectsToDelete = existingProjectIds.filter(id => !updatedProjectIds.includes(id));
        
        if (projectsToDelete.length > 0) {
          this.logger.info(`Deleting ${projectsToDelete.length} projects`);
          await queryRunner.manager.delete(Project, projectsToDelete);
        }
        
        const newProjects = await Promise.all(
          profileData.projects.map(async project => {
            // Si el proyecto ya existe, lo actualizamos en lugar de crear uno nuevo
            if (project.id) {
              const existingProject = await queryRunner.manager.findOne(Project, {
                where: { id: project.id },
                relations: ['skills']
              });
              
              if (existingProject) {
                // Actualizar propiedades del proyecto existente
                existingProject.title = project.title;
                existingProject.role = project.role;
                existingProject.description = project.description;
                existingProject.images = project.images;
                existingProject.website = project.website;
                existingProject.repository = project.repository;
                
                // Actualizar skills
                const skillEntities = await Promise.all(
                  (project.skills || []).map(async skillName => {
                    let skill = await queryRunner.manager.findOne(Skill, { where: { name: skillName } });
                    if (!skill) {
                      skill = queryRunner.manager.create(Skill, { name: skillName });
                      await queryRunner.manager.save(Skill, skill);
                    }
                    return skill;
                  })
                );
                
                existingProject.skills = skillEntities.filter(s => s !== null);
                await queryRunner.manager.save(Project, existingProject);
                return existingProject;
              }
            }
            
            // Si no existe, creamos uno nuevo
            const skillEntities = await Promise.all(
              (project.skills || []).map(async skillName => {
                let skill = await queryRunner.manager.findOne(Skill, { where: { name: skillName } });
                if (!skill) {
                  skill = queryRunner.manager.create(Skill, { name: skillName });
                  await queryRunner.manager.save(Skill, skill);
                }
                return skill;
              })
            );
            
            return queryRunner.manager.create(Project, { 
              ...project, 
              user, 
              skills: skillEntities.filter(s => s !== null) 
            });
          })
        );
        
        // Guardar los proyectos nuevos
        await queryRunner.manager.save(Project, newProjects.filter(p => !p.id));
        user.projects = newProjects;
      }

      // Actualizar certificaciones
      if (profileData.certifications && Array.isArray(profileData.certifications)) {
        this.logger.info('Processing certifications update');
        const newCertifications = profileData.certifications.map(cert =>
          queryRunner.manager.create(Certification, { ...cert, user })
        );
        await queryRunner.manager.save(Certification, newCertifications);
        user.certifications = newCertifications;
      }

      // Guardar usuario y actualizar progreso
      await queryRunner.manager.save(user);
      
      // Verificar si se eliminaron elementos y actualizar XP
      let levelProgress;
      
      // Verificar si se eliminaron todos los elementos de alguna categoría
      if (previousState.hasProjects && user.projects.length === 0) {
        this.logger.info('All projects were removed, updating level progress');
        levelProgress = await this.levelProgressService.handleItemRemoval(userId, user, 'projects');
      } else if (previousState.hasSkills && user.skills.length === 0) {
        this.logger.info('All skills were removed, updating level progress');
        levelProgress = await this.levelProgressService.handleItemRemoval(userId, user, 'skills');
      } else if (previousState.hasLanguages && user.languages.length === 0) {
        this.logger.info('All languages were removed, updating level progress');
        levelProgress = await this.levelProgressService.handleItemRemoval(userId, user, 'languages');
      } else if (previousState.hasCertifications && user.certifications.length === 0) {
        this.logger.info('All certifications were removed, updating level progress');
        levelProgress = await this.levelProgressService.handleItemRemoval(userId, user, 'certifications');
      } else {
        // Si no se eliminaron elementos, actualizar normalmente
        levelProgress = await this.levelProgressService.updateProfileProgress(userId, user);
      }

      // Commit transacción
      await queryRunner.commitTransaction();
      this.logger.info('Profile update successful', { userId });

      return { user, levelProgress };
    } catch (error) {
      // Rollback en caso de error
      await queryRunner.rollbackTransaction();
      this.logger.error('Profile update failed', { error, userId });
      throw error;
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }
}
