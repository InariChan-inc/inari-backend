import { IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}