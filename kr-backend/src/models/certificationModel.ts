import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  date!: string;

  @Column({ type: 'varchar', length: 255 })
  url!: string;

  @Column({ type: 'text' })
  description!: string;

  @ManyToOne(() => User, user => user.certifications)
  user!: User;
}