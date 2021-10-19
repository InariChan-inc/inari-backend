import {ThemeEnum, User} from "@root/entity/User/User";
import {plainToClass} from "class-transformer";
import {Field, ID, ObjectType} from "type-graphql";
import {ImageData} from "../file/ImageData";
import {RoleData} from "./RoleData";

@ObjectType()
export class UserData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, {nullable: true})
  aboutMe?: string;

  @Field(() => String)
  email: string;

  @Field(() => ThemeEnum)
  theme: ThemeEnum;

  @Field(() => ImageData, {nullable: true})
  avatar?: ImageData;

  @Field(() => RoleData, {nullable: true})
  roleData?: RoleData;

  tokenRefresh?: string;
  passwordHash: string;
  createdAt: Date;

  static loadFromEntity(user: User) {
    const userData = new UserData();
    userData.id = user.id;
    userData.name = user.name;
    userData.email = user.email;
    userData.aboutMe = user.aboutMe;
    userData.theme = user.theme;
    userData.tokenRefresh = user.tokenRefresh;
    userData.passwordHash = user.passwordHash;
    userData.createdAt = user.createdAt;

    userData.roleData = user.role ? RoleData.loadFromEntity(user.role) : undefined;
    userData.avatar = user.avatar ? plainToClass(ImageData, user.avatar) : undefined;

    return userData;
  }
}
