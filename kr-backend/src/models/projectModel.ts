import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  role!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'simple-array' })
  skills!: string[];

  @Column({ type: 'simple-array' })
  images!: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  website!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  repository!: string;

  @ManyToOne(() => User, user => user.projects)
  user!: User;
}
