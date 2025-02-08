import { Certification } from "../models/certificationModel";
import { Language } from "../models/languageModel";
import { Project } from "../models/projectModel";
import { Skill } from "../models/skillModel";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    description?: string;
    avatarSrc?: string;
    languages: Language[];
    skills: Skill[];
    projects: Project[];
    certifications: Certification[];
  }
export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github'
}
export enum AvailabilityType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  FREELANCE = 'FREELANCE',
  CONTRACT = 'CONTRACT'
}
export interface SocialNetwork {
  platform: string;
  url: string;
}