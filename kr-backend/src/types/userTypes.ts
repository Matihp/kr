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