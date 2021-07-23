import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class ImageInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  path: string;

  @Field(() => Boolean, {defaultValue: false})
  isTmp: boolean = false;
}