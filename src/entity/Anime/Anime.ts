import {Field, ID, ObjectType} from "type-graphql";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Images} from "../Images";
import {Genre} from "../Genre/Genre";
import {User} from "../User/User";
import {AnimeToTeam} from "./AnimeToTeam";
import {Expose} from "class-transformer";

export enum FormatAnimeEnum {
  TV,
  FILM,
  ONA,
  OVA,
  SPLESH
}

export enum SeasonAnimeEnum {
  SUMMER,
  FALL,
  SPRING,
  WINTER,
  NO_SEASON
}

export enum StatusAnimeEnum {
  NEW,
  ONGOING,
  COMPLETED
}

@Entity()
@ObjectType()
export class Anime {
  @Field(() => ID)
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Expose()
  @Column()
  name: string;

  @Expose()
  @OneToOne(() => Images)
  @JoinColumn()
  poster: Images;

  @Expose()
  @Column("simple-json")
  name_other: {ua: string; en?: string; ru?: string; jp?: string};

  @Expose()
  @Field()
  @Column("text")
  description: string;

  @Expose()
  @Field()
  @Column()
  current_count_episodes: number;

  @Expose()
  @Field()
  @Column()
  count_episodes: number;

  @Expose()
  @OneToMany(() => Genre, (genre) => genre.animes)
  public genres: Genre[];

  @Expose()
  @OneToOne(() => User)
  @JoinColumn({name: "user_created_id"})
  user: User;

  @Expose()
  @OneToMany(() => AnimeToTeam, (animeToTeam) => animeToTeam.team)
  public animeToTeams!: AnimeToTeam[];

  @Expose()
  @Field()
  @Column()
  duration: number;

  @Expose()
  @Field(() => FormatAnimeEnum)
  @Column()
  format: FormatAnimeEnum;

  @Expose()
  @Field(() => SeasonAnimeEnum)
  @Column()
  season: SeasonAnimeEnum;

  @Expose()
  @Field(() => StatusAnimeEnum)
  @Column()
  status: StatusAnimeEnum;

  @Expose()
  @Field(() => Date)
  @Column()
  date_release: Date;

  @Expose()
  @Field(() => Date, {nullable: true})
  @Column({nullable: true})
  date_end?: Date;

  @Expose()
  @CreateDateColumn()
  created_at: Date;

  @Expose()
  @UpdateDateColumn()
  update_at: Date;
}
