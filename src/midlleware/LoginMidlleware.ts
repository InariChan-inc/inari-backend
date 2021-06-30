import { User } from "@root/entity/User";
import { UserLoginInput } from "@root/inputs/User/UserLoginInput";
import { UserService } from "@root/services/UserService";
import { BodyParams, Constant, Middleware, Req, Res } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, Args, MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import * as jwt from "jsonwebtoken";
import { Token } from "@root/entity/Token";

@Middleware()
export class LoginMidlleware<T> implements MiddlewareInterface<T> {
  constructor(private userService: UserService) {
  }

  async use({ context, args, info }: ResolverData<T>, next: NextFn) {
    var user = await this.userService.findOne({ email: args.data.email });

    if (!user) {
      throw new Unauthorized("Unauthorized user")
    }

    if (!user.verifyPassword(args.data.password)) {
      throw new Unauthorized("Unauthorized user")
    }

    //this.userService.attachToken(user, token);

    var token = this.createJwt(user);

    return new Token(token);
  }


  createJwt(user: User) {
    const now = Date.now();

    return jwt.sign(
        {
            sub: user.id,
            exp: now + 1000 * 1000,
            iat: now
        },
        "Secret"
    );
}
}