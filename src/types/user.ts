import { Certification, Language } from "./profile";
import { Project } from "./projects";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    location:string;
    description:string;
    avatarSrc: string;
    projects: Project[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
    levelProgress: LevelProgress;
  }
  export interface UserData {
    users: User[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }
export interface Skill {
    id: string;
    name: string;
  }
  export interface LevelProgress {
    id: string;
    level: number;
    experiencePoints: number;
  }