import {Default, Description, Integer, Min} from "@tsed/schema";
import {Field, InputType, ObjectType} from "type-graphql";

@InputType()
export class Pageable {
  @Integer()
  @Min(0)
  @Default(0)
  @Description("Page number.")
  @Field()
  page = 0;

  @Integer()
  @Min(1)
  @Default(5)
  @Description("Number of objects per page.")
  @Field()
  size = 5;

  constructor(options: Partial<Pageable>) {
    options?.page && (this.page = options.page);
    options?.size && (this.size = options.size);
  }

  get offset() {
    return this.page ? this.page * this.limit : 0;
  }

  get limit() {
    return this.size;
  }
}
