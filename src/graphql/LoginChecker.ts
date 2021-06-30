import { Unauthorized } from "http-errors";
import { UserService } from "src/services/UserService";
import { UserLoginInput } from "../inputs/User/UserLoginInput";

export class LoginChecker {
    constructor(private userService: UserService) {

    }

    async auth(userLoginInput: UserLoginInput) {
        const user = await this.userService.findOne(userLoginInput);

        if (!user) {
            return false;
        }

        if (!user.verifyPassword(userLoginInput.password)) {
            return false;
        }

        return true;
    }
}