import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  language!: string;

  @Column({ type: 'varchar', length: 50 })
  level!: string;

  @ManyToOne(() => User, user => user.languages)
  user!: User;
}