import {InputType, Field, ID, ObjectType} from "type-graphql";
import { Stream } from "stream";

//@ObjectType()
export class Upload {
  //@Field(() => String)
  filename: string;

  //@Field(() => String)
  mimetype: string;

  //@Field(() => String)
  encoding: string;

  createReadStream: () => Stream;
}
