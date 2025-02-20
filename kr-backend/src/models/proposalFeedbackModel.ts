import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./userModel";
import { Proposal } from "./proposalModel";

@Entity("proposal_feedback")
export class ProposalFeedback {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Proposal)
  proposal!: Proposal;

  @ManyToOne(() => User)
  user!: User;

  @Column("text")
  content!: string;

  @Column({ type: "integer", nullable: true })
  rating?: number;

  @CreateDateColumn()
  createdAt!: Date;
}