import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Anime} from "../Anime/Anime";

@Entity()
@ObjectType()
export class Genre {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Anime, (anime) => anime.genres)
  animes: Anime;
}
