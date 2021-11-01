import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AnimeToTeam} from "../Anime/AnimeToTeam";

@Entity()
@ObjectType()
export class Team {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  indef: string;

  @OneToMany(() => AnimeToTeam, (animeToTeam) => animeToTeam.anime)
  public teamToAnimes!: AnimeToTeam[];
}
