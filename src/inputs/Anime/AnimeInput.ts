import {FormatAnimeEnum, SeasonAnimeEnum, StatusAnimeEnum} from "@root/entity/Anime/Anime";
import {EmailUniqValidator} from "@root/validators/user/EmailUniqValidator";
import {NameUniqValidator} from "@root/validators/user/NameUniqValidator";
import {IsEmail, Validate} from "class-validator";
import {InputType, Field, registerEnumType} from "type-graphql";
import {AnimeNameInput} from "./AnimeNameInput";

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
  @Field((type) => AnimeNameInput)
  name: AnimeNameInput;

  @Field()
  description: string;

  @Field()
  current_count_episodes: number;

  @Field()
  count_episodes: number;

  @Field()
  duration: number;

  @Field((type) => FormatAnimeEnum)
  format: FormatAnimeEnum;

  @Field((type) => SeasonAnimeEnum)
  season: SeasonAnimeEnum;

  @Field((type) => StatusAnimeEnum)
  status: StatusAnimeEnum;

  @Field()
  imageId: number;

  @Field()
  date_release: Date;
}
