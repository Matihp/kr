import { Skill } from "./user";

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  likes: number;
  user: {
    firstName: string;
    lastName: string;
    avatarSrc?: string;
  };
  skills: Skill[];
}

export interface PaginatedResponse {
  items: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
