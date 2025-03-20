import { api } from "./api";

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  website?: string;
  repository?: string;
  likes: number;
  skills: Array<{ id: string; name: string }>;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarSrc?: string;
  };
}

export interface PaginatedProjects {
  items: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const fetchProjects = async (
  page: number = 1, 
  pageSize: number = 9,
  skillIds?: string[]
): Promise<PaginatedProjects> => {
  try {
    let url = `/projects?page=${page}&pageSize=${pageSize}`;
    
    if (skillIds && skillIds.length > 0) {
      url += `&skillIds=${skillIds.join(',')}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Error fetching projects');
  }
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw new Error('Error fetching project details');
  }
};

export const likeProject = async (id: string): Promise<Project> => {
  try {
    const response = await api.post(`/projects/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking project:', error);
    throw new Error('Error liking project');
  }
};