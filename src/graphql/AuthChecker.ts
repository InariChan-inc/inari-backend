import {UserService} from "@root/services/UserService";
import {AuthChecker} from "type-graphql";
import {TContext} from "../interface/Context";

export const customAuthChecker: AuthChecker<TContext> = ({root, args, context, info}, params) => {
  if (context.user) {
    if (params[0] && !context.user.role.permissions.includes(params[0])) {
      return false;
    }
    return true;
  }
  return false;
};
