import {Field, InputType} from "type-graphql";
@InputType()
export class GenresFilterData {
  @Field(() => [String], {nullable: true})
  genreParams: string[];

  @Field(() => [String], {nullable: true})
  eGenreParams: string[];
}
