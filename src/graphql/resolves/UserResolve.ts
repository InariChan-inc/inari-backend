import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {UserService} from "@root/services/UserService";
import {Arg, Authorized, Ctx, Mutation, Query, registerEnumType, UseMiddleware} from "type-graphql";
import {ThemeEnum, User} from "@root/entity/User/User";
import {UserInput} from "@root/inputs/User/UserInput";
import {NotFound} from "@tsed/exceptions";
import {UserLoginInput} from "@root/inputs/User/UserLoginInput";
import {Token} from "@root/entity/Token";
import {JWTMidlleware} from "@root/midlleware/JWTMidlleware";
import {TContext} from "@root/interface/Context";
import {JWThelper} from "@root/helpers/JWTHelpers";
import {AuthenticationError} from "apollo-server-express";
import {TokenRefreshInput} from "@root/inputs/User/TokenRefreshInput";
import {UserData} from "@root/data/user/UserData";
import {boolean, number} from "@tsed/schema";
import {ThemeInput} from "@root/inputs/User/ThemeInput";
import {UserWithTokenData} from "../../data/user/UserWithTokenData";

@ResolverService(User)
export class UserResolve {
  @Inject(UserService)
  private userService: UserService;

  // @Query((returns) => [User], {description: "Get all the recipes from around the world "})
  // async users(): Promise<User[]> {
  //   return this.userService.findAll();
  // }

  @Authorized()
  @Query((returns) => UserData)
  async userProfile(@Ctx() ctx: TContext) {
    const user = await this.userService.findById(ctx.user!.id);

    return user;
  }

  @Query(() => Boolean)
  async existUserEmail(@Arg("email") email: string) {
    if (await this.userService.findOne({email})) {
      return true;
    }

    return false;
  }

  @Query(() => Boolean)
  async existUserName(@Arg("name") name: string) {
    if (await this.userService.findOne({name})) {
      return true;
    }

    return false;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async changeUserTheme(@Arg("data") themeInput: ThemeInput, @Ctx() ctx: TContext) {
    let user = ctx.user as User;
    if (await this.userService.updateById({id: user.id}, {theme: themeInput.theme})) {
      return true;
    }

    return false;
  }

  @Mutation(() => UserWithTokenData)
  async registartionUser(@Arg("data") userInput: UserInput) {
    let user = await this.userService.create(userInput);
    return {
      userData: UserData.loadFromEntity(user),
      tokenData: this.userService.createNewToken(user)
    };
  }

  @Mutation(() => UserWithTokenData)
  async loginUser(@Arg("data") userLoginInput: UserLoginInput) {
    let user = await this.userService.validateUser(userLoginInput);

    if (!user) {
      throw new AuthenticationError("Wrong credentials");
    }

    return {
      userData: UserData.loadFromEntity(user),
      tokenData: this.userService.createNewToken(user)
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Arg("tokenRefresh") tokenRefresh: string) {
    let user = await this.userService.validateRefreshToken(tokenRefresh);

    if (!user) {
      throw new AuthenticationError("Wrong refresh token");
    }

    return this.userService.createNewToken(user);
  }
}
