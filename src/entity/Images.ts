import {Field, ID, ObjectType} from "type-graphql";
import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ImageTypeEnum} from "../inputs/Image/ImageInput";
import {StatusAnimeEnum} from "./Anime/Anime";

@Entity()
export class Images {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: number;

  @Column()
  path: string;

  @Column({nullable: true})
  pathResized?: string;

  @Column()
  isTmp: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
