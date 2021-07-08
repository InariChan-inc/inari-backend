import { UserService } from "@root/services/UserService";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import * as jwt from "jsonwebtoken";
import { TContext } from "@root/interface/Context";
import { Unauthorized } from "@tsed/exceptions";
import { User } from "@root/entity/User/User";
import { Middleware } from "@tsed/common";
import { AuthenticationError } from "apollo-server-express";

@Middleware()
export class JWTMidlleware implements MiddlewareInterface<TContext> {
  constructor(private userService: UserService) {
  }

  async use({ context, args }: ResolverData<TContext>, next: NextFn) {
    const req = context.req;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return new AuthenticationError("Token not found")

    let user: User = await new Promise(async (resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET ?? "Secret", async (err: any, user: any) => {
        if (err) return reject(err.message);
        user = await this.userService.findOne(user.sub);

        return resolve(user);
      })
    });

    context.user = user;
    return next();
  }
}