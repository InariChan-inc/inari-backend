import {Field, InputType} from "type-graphql";
@InputType()
export class AnimeFilterData {
  @Field(() => [String], {nullable: true})
  genreParams: string[];

  @Field({nullable: true})
  searchParams: string;
}
