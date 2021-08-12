import {EmailUniqValidator} from "@root/validators/user/EmailUniqValidator";
import {NameUniqValidator} from "@root/validators/user/NameUniqValidator";
import {MaxLength} from "@tsed/schema";
import {IsEmail, maxLength, MinLength, Validate} from "class-validator";
import {InputType, Field} from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  @Validate(NameUniqValidator, {message: "Нікнейм уже зайнятий"})
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @Field()
  @IsEmail()
  @Validate(EmailUniqValidator, {message: "Емейл уже зайнятий"})
  email: string;

  @Field({nullable: true})
  @MinLength(10)
  @MaxLength(300)
  aboutMe?: string;

  @Field()
  @MinLength(6)
  password: string;
}
