import {Anime, FormatAnimeEnum, SeasonAnimeEnum, StatusAnimeEnum} from "@root/entity/Anime/Anime";
import {AnimeInput} from "@root/inputs/Anime/AnimeInput";
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
// import { Images } from "@root/Images";
// import { Janre } from "@root/Janre/Janre";
// import { Team } from "@root/Team/Team";
// import { User } from "@root/User/User";
// import { AnimeToTeam } from "@root/AnimeToTeam";
// import { Episode } from "@root/Episode";

@ObjectType()
export class AnimeData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  // @OneToOne(() => Images)
  // @JoinColumn()
  // poster: Images

  @Column("simple-json")
  nameOther: {ua: string; en?: string; ru?: string; jp?: string};

  @Field()
  description: string;

  @Field()
  currentCountEpisodes: number;

  @Field()
  countEpisodes: number;

  // @OneToMany(() => Janre, janre => janre.animes)
  // public janres: Janre[]

  // @OneToOne(() => User)
  // @JoinColumn({ name: "user_created_id" })
  // user: User

  // @OneToMany(() => AnimeToTeam, animeToTeam => animeToTeam.team)
  // public animeToTeams!: AnimeToTeam[];

  @Field()
  duration: number;

  @Field(() => FormatAnimeEnum)
  format: FormatAnimeEnum;

  @Field(() => SeasonAnimeEnum)
  season: SeasonAnimeEnum;

  @Field(() => StatusAnimeEnum)
  status: StatusAnimeEnum;

  @Field(() => Date)
  dateRelease: Date;

  @Field(() => Date, {nullable: true})
  dateEnd?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updateAt: Date;

  static loadFromEntity(anime: Anime) {
    const animeData = new AnimeData();
    animeData.id = anime.id;
    animeData.description = anime.description;
    animeData.name = anime.name_other.ua;
    animeData.nameOther = anime.name_other;
    animeData.currentCountEpisodes = anime.count_episodes;
    animeData.countEpisodes = anime.count_episodes;
    animeData.duration = anime.duration;
    animeData.season = anime.season;
    animeData.status = anime.status;
    animeData.format = anime.format;
    animeData.dateRelease = anime.date_release;

    return animeData;
  }
}
