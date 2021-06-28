import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import { UserService } from "../../services/UserService";
import {Arg, Query} from "type-graphql";
import { User } from "../../entity/User";

@ResolverService(User)
export class UserResolve {
  @Inject(UserService)
  private userService: UserService

  @Query((returns) => User)
  async user(@Arg("id") id: number) {
    const user = await this.userService.findById(id);

    // if (recipe === undefined) {
    //   throw new RecipeNotFoundError(id);
    // }

    return user;
  }

  @Query((returns) => [User], {description: "Get all the recipes from around the world "})
  async users(): Promise<User[]> {
    return this.userService.findAll({});
  }
}
