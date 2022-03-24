import {Field, InputType} from "type-graphql";
import {AnimeFilterEnum} from "../../../enum/anime/AnimeFIlterEnum";

@InputType()
export class AnimeFilterYearsData {
  @Field(() => AnimeFilterEnum)
  type: AnimeFilterEnum;

  @Field()
  params: string;
}
