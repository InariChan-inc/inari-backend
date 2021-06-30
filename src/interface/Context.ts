import { User } from "@root/entity/User";
import { Req, Res } from "@tsed/common";

export interface TContext {
    req: Req;
    res: Res;
    user: User;
}