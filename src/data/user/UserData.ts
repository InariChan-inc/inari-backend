import { ThemeEnum, User } from "@root/entity/User/User";
import {MaxLength} from "class-validator";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class UserData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  @MaxLength(30)
  email: string;

  @Field(() => ThemeEnum)
  theme: ThemeEnum;

  static loadFromEntity(user: User) {
    let userData = new UserData();
    userData.id = user.id;
    userData.name = user.name;
    userData.email = user.email;
    userData.theme = user.theme;

    return userData;
  }
}
