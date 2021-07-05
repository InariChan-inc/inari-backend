import { ClassType, Field, Int, ObjectType } from "type-graphql";
import { Pageable } from "./Pageable";

export interface IPaginatedResponse {
  data: any;
  total: number;
  hasMore: boolean;
}

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass extends Pageable {
    // here we use the runtime argument
    @Field(type => [TItemClass])
    // and here the generic type
    data: TItem[];

    @Field(type => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}