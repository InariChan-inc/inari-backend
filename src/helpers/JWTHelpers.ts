import { User } from "@root/entity/User/User";
import * as jwt from "jsonwebtoken";

export class JWThelper {
    static createToken(user: User) {
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