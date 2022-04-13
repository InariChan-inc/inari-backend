import {Field, ID, ObjectType} from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Images} from "../Images";
import {Genre} from "../Genre/Genre";
import {User} from "../User/User";
import {AnimeToTeam} from "./AnimeToTeam";
import {Expose} from "class-transformer";
import {ViewsInformation} from "./ViewsInformation";

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
  nameOther: {ua: string; en?: string; ru?: string; jp?: string};

  @Expose()
  @Field()
  @Column("text")
  description: string;

  @Expose()
  @Field()
  @Column()
  studio: string;

  @Expose()
  @Field()
  @Column()
  currentCountEpisodes: number;

  @Expose()
  @Field()
  @Column()
  countEpisodes: number;

  @Expose()
  @ManyToMany(() => Genre, (genres) => genres.animes)
  @JoinTable()
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
  dateRelease: Date;

  @Expose()
  @Field(() => Date, {nullable: true})
  @Column({nullable: true})
  dateEnd?: Date;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @ManyToOne(() => ViewsInformation)
  //@JoinColumn([{name: "id", referencedColumnName: "animeId"}])
  viewMonth: ViewsInformation;

  @Expose()
  @Column({select: false, nullable: true, insert: false, update: false})
  public gcount: number;

  @Expose()
  @UpdateDateColumn()
  updateAt: Date;
}
