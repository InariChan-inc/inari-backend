import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class ImageData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  path: string;

  @Field(() => Boolean, {defaultValue: false})
  isTmp: boolean = false;
}