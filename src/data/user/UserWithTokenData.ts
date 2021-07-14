import {Field, ID, ObjectType} from "type-graphql";
import { Token } from "../../entity/Token";
import { UserData } from "./UserData";

@ObjectType()
export class UserWithTokenData {
  @Field(() => UserData)
  userData: UserData;
  
  @Field(() => Token)
  tokenData: Token;
}
