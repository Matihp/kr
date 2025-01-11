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
    const { userId } = req.params;
    const profileData: ProfileData = req.body;

    try {
        // Buscar al usuario y cargar todas las relaciones necesarias
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['languages', 'skills', 'projects', 'certifications'],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
            const newProjects = profileData.projects.map(project =>
                projectRepository.create({ ...project, user })
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
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
