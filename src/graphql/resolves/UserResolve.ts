import { Inject } from "@tsed/di";
import { ResolverService } from "@tsed/graphql";
import { UserService } from "@root/services/UserService";
import { Arg, Ctx, Mutation, Query, UseMiddleware } from "type-graphql";
import { User } from "@root/entity/User/User";
import { UserInput } from "@root/inputs/User/UserInput";
import { NotFound } from "@tsed/exceptions";
import { UserLoginInput } from "@root/inputs/User/UserLoginInput";
import { Token } from "@root/entity/Token";
import { JWTMidlleware } from "@root/midlleware/JWTMidlleware";
import { TContext } from "@root/interface/Context";
import { JWThelper } from "@root/helpers/JWTHelpers";
import { AuthenticationError } from "apollo-server-express";
@ResolverService(User)
export class UserResolve {
  @Inject(UserService)
  private userService: UserService

  @Query((returns) => User)
  @UseMiddleware(JWTMidlleware)
  async userProfile(@Ctx() ctx: TContext) {
    const user = await this.userService.findById(ctx.user.id);

    if (user === undefined) {
      throw new NotFound("user not found");
    }

    return user;
  }

  @Mutation(() => User)
  async registartionUser(@Arg("data") userInput: UserInput) {
    return this.userService.create(userInput);
  }

  @Mutation(() => Token)
  async loginUser(@Arg("data") userLoginInput: UserLoginInput) {
    let user = await this.userService.validateUser(userLoginInput);

    if (!user) {
      throw new AuthenticationError("Wrong credentials");
    }
    
    return new Token(JWThelper.createToken(user));
  }

  @Query((returns) => [User], { description: "Get all the recipes from around the world " })
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
