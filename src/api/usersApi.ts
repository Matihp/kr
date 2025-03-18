import { api } from "./api";
import { UserData, Skill } from "@/types/user";

export const fetchUsers = async (page: number = 1, selectedSkills: string[] = []): Promise<UserData> => {
  try {
    const skillsParam = selectedSkills.length > 0 ? selectedSkills.join(',') : '';
    const response = await api.get(`/users?skillName=${skillsParam}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const fetchFreelancers = async (page: number = 1, selectedSkills: string[] = []): Promise<UserData> => {
  try {
    const skillsParam = selectedSkills.length > 0 ? selectedSkills.join(',') : '';
    const response = await api.get(`/users?userType=freelancer&skillName=${skillsParam}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching freelancers');
  }
};

export const fetchRecruiters = async (page: number = 1, selectedSkills: string[] = []): Promise<UserData> => {
  try {
    const skillsParam = selectedSkills.length > 0 ? selectedSkills.join(',') : '';
    const response = await api.get(`/users?userType=recruiter&skillName=${skillsParam}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching recruiters');
  }
};

export const fetchSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get('/skills/');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching skills');
  }
};