import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './userModel';
import { Skill } from './skillModel';

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

  @Column({ type: 'int', default: 0 })
  likes!: number;

  @Column({ type: 'simple-array' })
  images!: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  repository?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, user => user.projects, { eager: true })
  user!: User;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills!: Skill[];
}
