import {Field, InputType} from "type-graphql";
import {Pageable} from "../pageable/Pageable";
import {AnimeFilterData} from "./filter/AnimeFilterData";

@InputType()
export class AnimePegeable extends Pageable {
  @Field(() => AnimeFilterData)
  filters: AnimeFilterData;
}
