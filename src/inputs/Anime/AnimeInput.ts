import {FormatAnimeEnum, SeasonAnimeEnum, StatusAnimeEnum} from "@root/entity/Anime/Anime";
import {InputType, Field, registerEnumType} from "type-graphql";
import {AnimeNameInput} from "./AnimeNameInput";
import {FigureInput} from "./FigureInput";

registerEnumType(FormatAnimeEnum, {
  name: "FormatAnimeEnum",
  description: "Формат аніме"
});

registerEnumType(SeasonAnimeEnum, {
  name: "SeasonAnimeEnum",
  description: "сезон в якому знаходиться аніме",
  valuesConfig: {
    NO_SEASON: {
      description: "Аніме яке не належить ні одному сезону"
    }
  }
});

registerEnumType(StatusAnimeEnum, {
  name: "StatusAnimeEnum",
  description: "Статус"
});

@InputType()
export class AnimeInput {
  @Field(() => AnimeNameInput)
  name: AnimeNameInput;

  @Field()
  description: string;

  @Field()
  studio: string;

  @Field()
  currentCountEpisodes: number;

  @Field()
  countEpisodes: number;

  @Field()
  duration: number;

  @Field(() => [String])
  genres: string[];

  @Field(() => FormatAnimeEnum)
  format: FormatAnimeEnum;

  @Field(() => SeasonAnimeEnum)
  season: SeasonAnimeEnum;

  @Field(() => StatusAnimeEnum)
  status: StatusAnimeEnum;

  @Field(() => [FigureInput])
  figures: FigureInput[];

  @Field()
  imageId: number;

  @Field()
  dateRelease: Date;
}
