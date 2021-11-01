import {Field, InputType, registerEnumType} from "type-graphql";
import {FigureEnum} from "../../entity/Figure/Figure";

registerEnumType(FigureEnum, {
  name: "FigureEnum",
  description: "Тип діяча"
});

@InputType()
export class FigureInput {
  @Field()
  teamId: number;

  @Field(() => FigureEnum)
  type: FigureEnum;

  @Field()
  name: string;
}
