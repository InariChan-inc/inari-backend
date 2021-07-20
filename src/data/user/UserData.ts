import {ThemeEnum, User} from "@root/entity/User/User";
import {MaxLength} from "class-validator";
import {Field, ID, ObjectType} from "type-graphql";
import {RoleData} from "./RoleData";

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

  @Field(() => RoleData, {nullable: true})
  roleData?: RoleData;

  tokenRefresh?: string;
  passwordHash: string;

  static loadFromEntity(user: User) {
    let userData = new UserData();
    userData.id = user.id;
    userData.name = user.name;
    userData.email = user.email;
    userData.theme = user.theme;
    userData.tokenRefresh = user.tokenRefresh;
    userData.passwordHash = user.passwordHash;

    userData.roleData = user.role ? RoleData.loadFromEntity(user.role) : undefined;

    return userData;
  }
}
