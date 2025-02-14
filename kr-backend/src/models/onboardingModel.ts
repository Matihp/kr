import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./userModel";

export enum UserType {
  FREELANCER = "freelancer",
  RECRUITER = "recruiter"
}

@Entity("onboarding")
export class Onboarding {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({
    type: "enum",
    enum: UserType,
    nullable: true
  })
  userType?: UserType;

  @Column({ type: "boolean", default: false })
  isCompleted!: boolean;

  @Column({ type: "integer", default: 1 })
  currentStep!: number;
  // Freelancer
  @Column({ type: "text", nullable: true })
  professionalSummary?: string;

  @Column({ type: "varchar", array: true, nullable: true })
  preferredWorkTypes?: string[];

  @Column({ type: "integer", nullable: true })
  yearsOfExperience?: number;
  // Recruiter
  @Column({ type: "varchar", nullable: true })
  companyName?: string;

  @Column({ type: "varchar", nullable: true })
  industry?: string;

  @Column({ type: "text", nullable: true })
  hiringNeeds?: string;
}