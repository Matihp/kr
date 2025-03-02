import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./userModel";
import { GigType } from "../types/gigTypes";
import { GigStage } from "./gigStageModel";
import { GigReward } from "./gigRewardModel";

@Entity("gigs")
export class Gig {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  recruiter!: User;

  @Column("varchar")
  title!: string;

  @Column("text")
  description!: string;

  @Column({
    type: "enum",
    enum: GigType,
    default: GigType.STANDARD
  })
  type!: GigType;

  @Column({ type: "boolean", default: false })
  isAnonymous!: boolean;

  @Column({ type: "decimal" })
  budgetMin!: number;

  @Column({ type: "decimal" })
  budgetMax!: number;

  @Column({ type: "timestamp", nullable: true })
  flashDeadline?: Date;

  @Column({ type: "boolean", default: false })
  requiresTeam!: boolean;

  @OneToMany(() => GigStage, stage => stage.gig)
  stages!: GigStage[];

  @ManyToOne(() => GigStage, stage => stage.gigsAtThisStage, { nullable: true })
  currentStage: GigStage;

  @OneToMany(() => GigReward, reward => reward.gig)
  rewards!: GigReward[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}