import {Anime, FormatAnimeEnum, SeasonAnimeEnum, StatusAnimeEnum} from "@root/entity/Anime/Anime";
import {plainToClass} from "class-transformer";
import {Field, ID, ObjectType} from "type-graphql";
import {Column} from "typeorm";
import {Genre} from "../../entity/Genre/Genre";
import {ImageData} from "../file/ImageData";
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

  @Field(() => ImageData)
  poster: ImageData;

  @Column("simple-json")
  nameOther: {ua: string; en?: string; ru?: string; jp?: string};

  @Field()
  description: string;

  @Field()
  studio: string;

  @Field()
  currentCountEpisodes: number;

  @Field()
  countEpisodes: number;

  @Field({nullable: true})
  monthViews: number;

  @Field()
  duration: number;

  @Field(() => FormatAnimeEnum)
  format: FormatAnimeEnum;

  @Field(() => SeasonAnimeEnum)
  season: SeasonAnimeEnum;

  @Field(() => StatusAnimeEnum)
  status: StatusAnimeEnum;

  @Field(() => [Genre])
  genres: Genre[];

  @Field(() => Date)
  dateRelease: Date;

  @Field(() => Date, {nullable: true})
  dateEnd?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updateAt: Date;

  static loadFromEntity(anime: Anime): AnimeData {
    return plainToClass(AnimeData, {...anime, monthViews: anime.viewMonth?.views});
  }
}
