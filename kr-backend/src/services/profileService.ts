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

      // Actualizar campos básicos
      if (profileData.description) user.description = profileData.description;
      if (profileData.avatarSrc) user.avatarSrc = profileData.avatarSrc;

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
        const newProjects = await Promise.all(
          profileData.projects.map(async project => {
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
        await queryRunner.manager.save(Project, newProjects);
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
      const levelProgress = await this.levelProgressService.updateProfileProgress(userId, user);

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
