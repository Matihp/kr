export interface ProfileCompletion {
    basicInfo: boolean;
    description: boolean;
    avatar: boolean;
    skills: boolean;
    languages: boolean;
    projects: boolean;
    certifications: boolean;
  }
  
export interface LevelProgress {
    id: string;
    level: number;
    experiencePoints: number;
    completedAchievements: Record<string, boolean>;
    profileCompletion: ProfileCompletion;
  }