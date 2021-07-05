import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import { UserService } from "../../services/UserService";
import {Arg, Mutation, Query} from "type-graphql";
import { UserInput } from "../../inputs/User/UserInput";
import { Images } from "../../entity/Images";

@ResolverService(Images)
export class FileResolve {
  @Inject(UserService)
  private userService: UserService

  @Mutation(() => Images)
  async createFile(@Arg("data") userInput : UserInput){
    this.userService.create(userInput);
  }
}
