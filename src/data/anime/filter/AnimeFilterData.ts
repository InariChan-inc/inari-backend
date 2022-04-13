import {Field, InputType} from "type-graphql";
import {SeasonAnimeEnum} from "../../../entity/Anime/Anime";
@InputType()
export class AnimeFilterData {
  @Field(() => [String], {nullable: true})
  genreParams: string[];

  @Field(() => [String], {nullable: true})
  excludeGenreParams: string[];

  @Field({nullable: true})
  searchParams: string;

  @Field(() => SeasonAnimeEnum, {nullable: true})
  seasonParams: SeasonAnimeEnum;
}
