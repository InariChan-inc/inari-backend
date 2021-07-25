import {Field, InputType} from "type-graphql";

@InputType()
export class BanerInput {
  @Field()
  name: string;
  
  @Field()
  image_id: number;
}
