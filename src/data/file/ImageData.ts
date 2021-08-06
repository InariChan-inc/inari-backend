import {Field, ID, ObjectType} from "type-graphql";
import {ImageTypeEnum} from "../../inputs/Image/ImageInput";

@ObjectType()
export class ImageData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => ImageTypeEnum)
  type: ImageTypeEnum;

  @Field(() => String)
  path: string;

  @Field(() => String, {nullable: true})
  pathResized?: string;

  @Field(() => Boolean, {defaultValue: false})
  isTmp = false;
}
