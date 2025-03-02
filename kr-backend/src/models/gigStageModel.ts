import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Gig } from "./gigModel";
@Entity("gig_stages")
export class GigStage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Gig)
  gig!: Gig;

  @OneToMany(() => Gig, gig => gig.currentStage)
gigsAtThisStage: Gig[];

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