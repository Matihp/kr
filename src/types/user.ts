import { Certification, Language } from "./profile";
import { Project } from "./projects";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    description:string;
    avatarSrc: string;
    projects: Project[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
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