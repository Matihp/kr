import { SocialNetwork } from "./userTypes";

export type Language = {
    language: string;
    level: string;
  };
  
  export type Skill = {
    name: string;
  };
  
  export type Project = {
    id: string;
    title: string;
    role: string;
    description: string;
    skills: string[];
    images: string[];
    website?: string;
    repository?: string;
  };
  
  export type Certification = {
    name: string;
    date: string;
    url: string;
    description: string;
  };
  
  export type ProfileData = {
    firstName: string;
    lastName: string;
    location?: string;
    socialNetworks?: SocialNetwork[];
    description?: string;
    avatarSrc?: string;
    languages: Language[];
    skills: string[];
    projects: Project[];
    certifications: Certification[];
  };
  