import {User} from "../entity/User/User";

declare global {
  interface Req {
    user: User;
  }
}

export interface Req {}
