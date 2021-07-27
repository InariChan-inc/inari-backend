import {Field, ObjectType, registerEnumType} from "type-graphql";

export enum ImageTypeEnum {
  BANER,
  POSTER,
  AVATAR
}

registerEnumType(ImageTypeEnum, {
  name: "ImageTypeEnum",
  description: "Виберіть призначення зображення",
});

@ObjectType()
export class ImageInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  path: string;

  @Field(() => ImageTypeEnum)
  type: ImageTypeEnum;

  @Field(() => Boolean, {defaultValue: false})
  isTmp: boolean = false;
}
