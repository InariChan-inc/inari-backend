import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AnimeToTeam} from "../Anime/AnimeToTeam";
import {Team} from "../Team/Team";

export enum FigureEnum {
  Soundman,
  Translators,
  Actors
}

@Entity()
@ObjectType()
export class Figure {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("int")
  type: FigureEnum;

  @Column({nullable: true})
  profileId: number;

  @ManyToOne(() => AnimeToTeam, (anime) => anime.figures)
  animeToTeam: AnimeToTeam;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];
}
