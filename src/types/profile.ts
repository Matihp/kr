export type LanguageLevel = "beginner" | "intermediate" | "advanced" | string;

export type Language = {
  language: string;
  level: LanguageLevel;
};

export type Certification = {
  id: string;
  name: string;
  date: string;
  url: string;
  description: string;
};

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  images: string[];
  website: string;
  repository: string;
}

export interface ProjectFormData {
  id?: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  images: (File | string)[];
  website: string;
  repository: string;
}