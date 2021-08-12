import {ThemeEnum} from "@root/entity/User/User";
import {InputType, Field, registerEnumType} from "type-graphql";

registerEnumType(ThemeEnum, {
  name: "ThemeEnum",
  description: "Вибрана тема користувача"
});

@InputType()
export class ThemeInput {
  @Field(() => ThemeEnum)
  theme: ThemeEnum;
}
