export interface User {
    id: string;
    firstName: string;
    lastName: string;
    description:string;
    avatarSrc: string;
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