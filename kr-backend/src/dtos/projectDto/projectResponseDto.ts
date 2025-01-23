export class ProjectResponseDto {
    id!: string;
    title!: string;
    description!: string;
    images!: string[];
    website?: string;
    repository?: string;
    likes!: number;
    skills!: Array<{ id: string; name: string }>;
    user!: {
      id: string;
      firstName: string;
      lastName: string;
      avatarSrc?: string;
    };
  }
