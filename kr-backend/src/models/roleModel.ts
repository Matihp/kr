import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER
  })
  type!: RoleType;
}