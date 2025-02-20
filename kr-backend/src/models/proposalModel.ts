import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./userModel";
import { ProposalStatus } from "../types/proposalTypes";
import { ProposalFeedback } from "./proposalFeedbackModel";
import { Gig } from "./gigModel";

@Entity("proposals")
export class Proposal {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  freelancer!: User;

  @ManyToOne(() => Gig)
  gig!: Gig;

  @Column("decimal")
  price!: number;

  @Column("text")
  description!: string;

  @Column({ type: "varchar", nullable: true })
  videoUrl?: string;

  @Column({
    type: "enum",
    enum: ProposalStatus,
    default: ProposalStatus.PENDING
  })
  status!: ProposalStatus;

  @Column({ type: "jsonb", nullable: true })
  priceOptions?: {
    price: number;
    scope: string;
  }[];

  @OneToMany(() => ProposalFeedback, feedback => feedback.proposal)
  feedback!: ProposalFeedback[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}