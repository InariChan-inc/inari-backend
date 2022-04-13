import {Expose} from "class-transformer";
import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Anime} from "../Anime/Anime";

@Entity()
@ObjectType()
export class Genre {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Expose()
  @ManyToMany(() => Anime, (animes) => animes.genres)
  @JoinColumn()
  public animes: Anime[];
}
