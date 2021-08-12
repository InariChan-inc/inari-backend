import {Field, ID, ObjectType} from "type-graphql";
import {ImageData} from "../file/ImageData";

@ObjectType()
export class BanerData {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => ImageData)
  image: ImageData;
}
