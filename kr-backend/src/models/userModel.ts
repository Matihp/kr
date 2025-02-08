import {
  Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany,ManyToOne,
  JoinColumn,ManyToMany,JoinTable,OneToOne,
} from "typeorm";
import { Language } from "./languageModel";
import { Skill } from "./skillModel";
import { Project } from "./projectModel";
import { Certification } from "./certificationModel";
import { Role } from "./roleModel";
import {
  AuthProvider,
  AvailabilityType,
  SocialNetwork,
} from "../types/userTypes";
import { Notification } from "./notificationModel";
import { LevelProgress } from "./levelProgressModel";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatarSrc?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location?: string;

  @Column({
    type: "enum",
    enum: AvailabilityType,
    nullable: true,
  })
  availability?: AvailabilityType;

  @Column({
    type: "jsonb",
    nullable: true,
    default: [],
  })
  socialNetworks?: SocialNetwork[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    type: "enum",
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  authProvider!: AuthProvider;

  @Column({ type: "varchar", length: 255, nullable: true })
  googleId?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  githubId?: string;

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable()
  skills!: Skill[];

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn()
  role!: Role;

  @OneToMany(() => Language, (language) => language.user)
  languages!: Language[];

  @OneToMany(() => Project, (project) => project.user)
  projects!: Project[];

  @OneToMany(() => Certification, (certification) => certification.user)
  certifications!: Certification[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToOne(() => LevelProgress, (levelProgress) => levelProgress.user)
  levelProgress!: LevelProgress;
}
