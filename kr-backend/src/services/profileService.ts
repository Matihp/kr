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

const userRepository = AppDataSource.getRepository(User);
const languageRepository = AppDataSource.getRepository(Language);
const skillRepository = AppDataSource.getRepository(Skill);
const projectRepository = AppDataSource.getRepository(Project);
const certificationRepository = AppDataSource.getRepository(Certification);

export class ProfileService {
  private levelProgressService: LevelProgressService;

  constructor() {
    this.levelProgressService = new LevelProgressService();
  }

  async updateProfile(userId: string, profileData: ProfileData): Promise<{user: User, levelProgress: LevelProgress}> {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['languages', 'skills', 'projects', 'certifications'],
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Actualizar descripción y avatar
    user.description = profileData.description || user.description;
    user.avatarSrc = profileData.avatarSrc || user.avatarSrc;

    // **Actualizar idiomas**
    if (profileData.languages && Array.isArray(profileData.languages)) {
      const newLanguages = profileData.languages.map(lang =>
        languageRepository.create({ ...lang, user })
      );
      await languageRepository.save(newLanguages);
      user.languages = newLanguages;
    }

    // **Actualizar habilidades**
    if (profileData.skills && Array.isArray(profileData.skills)) {
      const skillNames = profileData.skills;
      const skills = await Promise.all(
        skillNames.map(async skillName => {
          let skill = await skillRepository.findOne({ where: { name: skillName } });
          if (!skill) {
            skill = skillRepository.create({ name: skillName });
            await skillRepository.save(skill);
          }
          return skill;
        })
      );
      user.skills = skills;
    }

    // **Actualizar proyectos**
    if (profileData.projects && Array.isArray(profileData.projects)) {
      const newProjects = await Promise.all(
        profileData.projects.map(async project => {
          const skillEntities = await Promise.all(
            project.skills.map(async skillName => {
              let skill = await skillRepository.findOne({ where: { name: skillName } });
              if (!skill) {
                skill = skillRepository.create({ name: skillName });
                await skillRepository.save(skill);
              }
              return skill;
            })
          );
          return projectRepository.create({ ...project, user, skills: skillEntities });
        })
      );
      await projectRepository.save(newProjects);
      user.projects = newProjects;
    }

    // **Actualizar certificaciones**
    if (profileData.certifications && Array.isArray(profileData.certifications)) {
      const newCertifications = profileData.certifications.map(cert =>
        certificationRepository.create({ ...cert, user })
      );
      await certificationRepository.save(newCertifications);
      user.certifications = newCertifications;
    }

    // Guardar el usuario con las relaciones actualizadas
    await userRepository.save(user);
    const levelProgress = await this.levelProgressService.updateProfileProgress(userId, user);

    return { user, levelProgress };
  }
}
