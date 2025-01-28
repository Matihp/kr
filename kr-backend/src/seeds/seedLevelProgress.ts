import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { LevelProgress } from '../models/levelProgressModel';

export const createLevelProgressSeed = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const levelProgressRepository = AppDataSource.getRepository(LevelProgress);

  try {
    // Obtener todos los usuarios que no tienen LevelProgress
    const users = await userRepository.find({
      relations: ['levelProgress', 'skills', 'languages', 'projects', 'certifications'],
    });

    for (const user of users) {
      // Si el usuario no tiene LevelProgress, crear uno
      if (!user.levelProgress) {
        const levelProgress = levelProgressRepository.create({
          user,
          level: 1,
          experiencePoints: 0,
          completedAchievements: {},
          profileCompletion: {
            basicInfo: !!(user.firstName && user.lastName && user.email),
            description: !!user.description,
            avatar: !!user.avatarSrc,
            skills: user.skills?.length > 0,
            languages: user.languages?.length > 0,
            projects: user.projects?.length > 0,
            certifications: user.certifications?.length > 0,
          }
        });

        // Calcular XP inicial basado en el contenido existente
        let initialXP = 0;

        // XP por secciones completadas
        if (user.firstName && user.lastName && user.email) initialXP += 50; // basicInfo
        if (user.description) initialXP += 50; // description
        if (user.avatarSrc) initialXP += 50; // avatar
        if (user.skills?.length > 0) {
          initialXP += 50; // skills section
          initialXP += 100; // FIRST_SKILL achievement
          levelProgress.completedAchievements['FIRST_SKILL'] = true;
        }
        if (user.languages?.length > 0) {
          initialXP += 50; // languages section
          initialXP += 100; // FIRST_LANGUAGE achievement
          levelProgress.completedAchievements['FIRST_LANGUAGE'] = true;
        }
        if (user.projects?.length > 0) {
          initialXP += 50; // projects section
          initialXP += 100; // FIRST_PROJECT achievement
          levelProgress.completedAchievements['FIRST_PROJECT'] = true;
        }
        if (user.certifications?.length > 0) {
          initialXP += 50; // certifications section
          initialXP += 100; // FIRST_CERTIFICATION achievement
          levelProgress.completedAchievements['FIRST_CERTIFICATION'] = true;
        }

        // Bonus por perfil completo
        if (Object.values(levelProgress.profileCompletion).every(value => value === true)) {
          initialXP += 200;
          levelProgress.completedAchievements['PROFILE_COMPLETED'] = true;
        }

        levelProgress.experiencePoints = initialXP;
        levelProgress.level = Math.floor(initialXP / 500) + 1;

        await levelProgressRepository.save(levelProgress);
        console.log(`Created level progress for user: ${user.email}`);
      }
    }

    console.log('Level progress seed completed successfully');
  } catch (error) {
    console.error('Error in level progress seed:', error);
    throw error;
  }
};

// Ejecutar el seed
AppDataSource.initialize().then(async () => {
  console.log('Running level progress seed...');
  await createLevelProgressSeed();
  console.log('Seed completed, closing connection...');
  await AppDataSource.destroy();
}).catch(error => console.log(error));