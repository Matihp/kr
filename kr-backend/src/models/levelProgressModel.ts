import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './userModel';

@Entity('level_progress')
export class LevelProgress {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({ type: 'int', default: 1 })
  level!: number;

  @Column({ type: 'int', default: 0 })
  experiencePoints!: number;

  @Column({ type: 'jsonb', default: {} })
  completedAchievements!: Record<string, boolean>;

  @Column({ type: 'jsonb', default: {} })
  profileCompletion!: {
    basicInfo: boolean;
    description: boolean;
    avatar: boolean;
    skills: boolean;
    languages: boolean;
    projects: boolean;
    certifications: boolean;
  };
}