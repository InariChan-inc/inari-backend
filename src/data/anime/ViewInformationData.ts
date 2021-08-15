import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class ViewInformationData {
  @Field()
  views: number;

  @Field()
  dateMonth: string;
}
