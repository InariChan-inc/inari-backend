import {ImageData} from "@root/data/file/ImageData";
import {ThemeEnum} from "@root/entity/User/User";
import {RequiredValidator} from "@root/validators/user/RequiredValidator";
import {MaxLength} from "@tsed/schema";
import {MinLength, Validate} from "class-validator";
import {InputType, Field} from "type-graphql";

@InputType()
export class UserUpdateInput {
  @Field({nullable: true})
  @MinLength(10)
  @MaxLength(300)
  aboutMe?: string;

  @Field({nullable: true})
  @MinLength(6)
  @Validate(RequiredValidator, ["passwordOld"], {
    message: "Ви не вказали старий пароль"
  })
  passwordNew?: string;

  @Field({nullable: true})
  @MinLength(6)
  @Validate(RequiredValidator, ["passwordNew"], {
    message: "Ви не вказали новий пароль"
  })
  passwordOld?: string;

  @Field(() => ThemeEnum, {nullable: true})
  theme?: ThemeEnum;

  tokenRefresh?: string;

  avatar?: ImageData;
}
