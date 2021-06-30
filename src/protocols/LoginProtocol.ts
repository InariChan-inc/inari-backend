import {BodyParams, Req} from "@tsed/common";
import {Strategy} from "passport-local";
import {Unauthorized} from "@tsed/exceptions";
import {Protocol, OnInstall, OnVerify} from "@tsed/passport"; 
import {Inject} from "@tsed/di";
import {UserService} from "../services/UserService"
import { Format, Required } from "@tsed/schema";

export class Credentials {
  @Required()
  @Format('email')
  email: string;
  
  @Required()
  password: string;
}

@Protocol({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LocalProtocol implements OnVerify, OnInstall {
  @Inject(UserService)
  private userService: UserService;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const user = await this.userService.findOne(credentials);

    if (!user) {
       throw new Unauthorized("Unauthorized user")
    }
 
    if(!user.verifyPassword(credentials.password)) {
        throw new Unauthorized("Unauthorized user")
    }

    return user;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}