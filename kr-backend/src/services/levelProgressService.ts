import { AppDataSource } from '../config/data-source';
import { ProfileCompletionDto } from '../dtos/levelProgressDto.ts/profileCompletionDto';
import { LevelProgress } from '../models/levelProgressModel';
import { User } from '../models/userModel';
import { Achievement } from '../types/levelTypes';

export class LevelProgressService {
  private levelProgressRepository = AppDataSource.getRepository(LevelProgress);

  async getOrCreateProgress(userId: string): Promise<LevelProgress> {
    let progress = await this.levelProgressRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!progress) {
      const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
      if (!user) throw new Error('User not found');

      progress = this.levelProgressRepository.create({
        user,
        level: 1,
        experiencePoints: 0,
        completedAchievements: {},
        profileCompletion: {
          basicInfo: false,
          description: false,
          avatar: false,
          skills: false,
          languages: false,
          projects: false,
          certifications: false,
        },
      });
      await this.levelProgressRepository.save(progress);
    }

    return progress;
  }

  async updateProfileProgress(userId: string, user: User): Promise<LevelProgress> {
    const progress = await this.getOrCreateProgress(userId);
    const previousCompletion = { ...progress.profileCompletion };

    // Actualizar estado de completitud
    progress.profileCompletion = {
      basicInfo: !!(user.firstName && user.lastName && user.email),
      description: !!user.description,
      avatar: !!user.avatarSrc,
      skills: user.skills?.length > 0,
      languages: user.languages?.length > 0,
      projects: user.projects?.length > 0,
      certifications: user.certifications?.length > 0,
    };

    // Otorgar XP por nuevas completitudes
    Object.entries(progress.profileCompletion).forEach(([key, completed]) => {
      if (completed && !previousCompletion[key as keyof ProfileCompletionDto]) {
        progress.experiencePoints += 50; // 50 XP por cada nueva sección completada
      }
    });

    // Verificar logros
    if (
      this.isProfileComplete(progress.profileCompletion) &&
      !progress.completedAchievements[Achievement.PROFILE_COMPLETED]
    ) {
      progress.completedAchievements[Achievement.PROFILE_COMPLETED] = true;
      progress.experiencePoints += 200; // Bonus por completar todo el perfil
    }

    // Primera habilidad
    if (user.skills?.length > 0 && !progress.completedAchievements[Achievement.FIRST_SKILL]) {
      progress.completedAchievements[Achievement.FIRST_SKILL] = true;
      progress.experiencePoints += 100;
    }

    // Primer idioma
    if (user.languages?.length > 0 && !progress.completedAchievements[Achievement.FIRST_LANGUAGE]) {
      progress.completedAchievements[Achievement.FIRST_LANGUAGE] = true;
      progress.experiencePoints += 100;
    }

    // Primer proyecto
    if (user.projects?.length > 0 && !progress.completedAchievements[Achievement.FIRST_PROJECT]) {
      progress.completedAchievements[Achievement.FIRST_PROJECT] = true;
      progress.experiencePoints += 100;
    }

    // Primera certificación
    if (
      user.certifications?.length > 0 &&
      !progress.completedAchievements[Achievement.FIRST_CERTIFICATION]
    ) {
      progress.completedAchievements[Achievement.FIRST_CERTIFICATION] = true;
      progress.experiencePoints += 100;
    }

    // Actualizar nivel (cada 500 XP = 1 nivel)
    progress.level = Math.floor(progress.experiencePoints / 500) + 1;

    return this.levelProgressRepository.save(progress);
  }

  // Nueva función para manejar eliminación de elementos
  async handleItemRemoval(userId: string, user: User, itemType: string): Promise<LevelProgress> {
    const progress = await this.getOrCreateProgress(userId);
    const previousCompletion = { ...progress.profileCompletion };
    
    // Actualizar estado de completitud actual
    const updatedCompletion = {
      basicInfo: !!(user.firstName && user.lastName && user.email),
      description: !!user.description,
      avatar: !!user.avatarSrc,
      skills: user.skills?.length > 0,
      languages: user.languages?.length > 0,
      projects: user.projects?.length > 0,
      certifications: user.certifications?.length > 0,
    };
    
    // Verificar si alguna sección pasó de completada a no completada
    if (previousCompletion[itemType as keyof ProfileCompletionDto] && !updatedCompletion[itemType as keyof ProfileCompletionDto]) {
      // Restar XP por la sección ahora incompleta
      progress.experiencePoints -= 50;
      
      // Si el usuario tenía el logro de perfil completo y ahora no está completo, quitarlo
      if (
        progress.completedAchievements[Achievement.PROFILE_COMPLETED] &&
        !this.isProfileComplete(updatedCompletion)
      ) {
        progress.completedAchievements[Achievement.PROFILE_COMPLETED] = false;
        progress.experiencePoints -= 200; // Quitar el bonus por perfil completo
      }
      
      // Restar puntos específicos según el logro
      switch (itemType) {
        case 'skills':
          if (
            user.skills?.length === 0 &&
            progress.completedAchievements[Achievement.FIRST_SKILL]
          ) {
            progress.completedAchievements[Achievement.FIRST_SKILL] = false;
            progress.experiencePoints -= 100;
          }
          break;
          
        case 'languages':
          if (
            user.languages?.length === 0 &&
            progress.completedAchievements[Achievement.FIRST_LANGUAGE]
          ) {
            progress.completedAchievements[Achievement.FIRST_LANGUAGE] = false;
            progress.experiencePoints -= 100;
          }
          break;
          
        case 'projects':
          if (
            user.projects?.length === 0 &&
            progress.completedAchievements[Achievement.FIRST_PROJECT]
          ) {
            progress.completedAchievements[Achievement.FIRST_PROJECT] = false;
            progress.experiencePoints -= 100;
          }
          break;
          
        case 'certifications':
          if (
            user.certifications?.length === 0 &&
            progress.completedAchievements[Achievement.FIRST_CERTIFICATION]
          ) {
            progress.completedAchievements[Achievement.FIRST_CERTIFICATION] = false;
            progress.experiencePoints -= 100;
          }
          break;
      }
      
      // Asegurar que XP no sea negativo
      progress.experiencePoints = Math.max(0, progress.experiencePoints);
      
      // Actualizar nivel (cada 500 XP = 1 nivel)
      progress.level = Math.floor(progress.experiencePoints / 500) + 1;
      
      // Guardar el estado actual de completitud
      progress.profileCompletion = updatedCompletion;
    }
    
    return this.levelProgressRepository.save(progress);
  }

  private isProfileComplete(completion: ProfileCompletionDto): boolean {
    return Object.values(completion).every((value) => value === true);
  }
}