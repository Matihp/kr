import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Gig } from "./gigModel";
@Entity("gig_stages")
export class GigStage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Gig)
  gig!: Gig;

  @Column("varchar")
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal")
  payment!: number;

  @Column("integer")
  order!: number;

  @Column({ type: "boolean", default: false })
  isCompleted!: boolean;
}