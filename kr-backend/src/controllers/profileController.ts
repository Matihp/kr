import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { Language } from '../models/languageModel';
import { Skill } from '../models/skillModel';
import { Project } from '../models/projectModel';
import { Certification } from '../models/certificationModel';
import { ProfileData } from '../types/profileTypes';

const userRepository = AppDataSource.getRepository(User);
const languageRepository = AppDataSource.getRepository(Language);
const skillRepository = AppDataSource.getRepository(Skill);
const projectRepository = AppDataSource.getRepository(Project);
const certificationRepository = AppDataSource.getRepository(Certification);

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.params; // Asegúrate de que userId venga como parámetro de la ruta
  const profileData: ProfileData = req.body;

  try {
    const user = await userRepository.findOne({ where: { id: userId }, relations: ['languages', 'skills', 'projects', 'certifications'] });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.description = profileData.description;
    user.avatarSrc = profileData.avatarSrc;

    // Actualizar idiomas
    await languageRepository.remove(user.languages);
    user.languages = profileData.languages.map(lang => languageRepository.create({ ...lang, user }));

    // Actualizar habilidades
    await skillRepository.remove(user.skills);
    user.skills = profileData.skills.map(skill => skillRepository.create({ name: skill, user }));

    // Actualizar proyectos
    await projectRepository.remove(user.projects);
    user.projects = profileData.projects.map(project => projectRepository.create({ ...project, user }));

    // Actualizar certificaciones
    await certificationRepository.remove(user.certifications);
    user.certifications = profileData.certifications.map(cert => certificationRepository.create({ ...cert, user }));

    await userRepository.save(user);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};




