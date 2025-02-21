import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Gig } from "./gigModel";
@Entity("gig_rewards")
export class GigReward {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Gig)
  gig!: Gig;

  @Column("varchar")
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal")
  amount!: number;

  @Column({ type: "varchar", array: true })
  criteria!: string[];
}