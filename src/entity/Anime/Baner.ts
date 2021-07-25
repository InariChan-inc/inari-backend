import {Field, ID} from "type-graphql";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Images} from "../Images";

@Entity()
export class Baner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Images)
  @JoinColumn()
  image: Images;
}
