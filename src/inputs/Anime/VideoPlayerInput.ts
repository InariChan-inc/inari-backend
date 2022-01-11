import {Field, InputType} from "type-graphql";

@InputType()
export class VideoPlayerInput {
  @Field()
  name: string;

  @Field()
  iframe: string;
}
