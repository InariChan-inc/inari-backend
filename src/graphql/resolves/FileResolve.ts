import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import { UserService } from "../../services/UserService";
import {Arg, Mutation, Query} from "type-graphql";
import { UserInput } from "../../inputs/User/UserInput";
import { Files } from "../../entity/Images";

@ResolverService(Files)
export class FileResolve {
  @Inject(UserService)
  private userService: UserService

  @Mutation(() => Files)
  async createFile(@Arg("data") userInput : UserInput){
    this.userService.create(userInput);
  }
}
