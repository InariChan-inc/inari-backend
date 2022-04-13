import {Field, InputType} from "type-graphql";
import {FormatAnimeEnum, SeasonAnimeEnum} from "../../../entity/Anime/Anime";
import {GenresFilterData} from "./GenresFilterData";
@InputType()
export class AnimeFilterData {
  @Field(() => GenresFilterData, {nullable: true})
  genre: GenresFilterData;

  @Field({nullable: true})
  searchParams: string;

  @Field(() => FormatAnimeEnum, {nullable: true})
  typeParams: FormatAnimeEnum;

  @Field(() => SeasonAnimeEnum, {nullable: true})
  seasonParams: SeasonAnimeEnum;
}
