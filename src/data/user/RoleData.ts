import {MaxLength} from "@tsed/schema";
import {Field, ID, ObjectType} from "type-graphql";
import {Roles} from "../../entity/User/Roles";

@ObjectType()
export class RoleData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  key: string;

  @Field(() => [String])
  permissions: string[];

  static loadFromEntity(role: Roles) {
    let roleData = new RoleData();
    roleData.id = role.id;
    roleData.name = role.name;
    roleData.key = role.key;
    roleData.permissions = role.permissions;

    return roleData;
  }
}
