import { Permission } from "@root/entity/User/Permission";
import { Roles } from "@root/entity/User/Roles";
import { User } from "@root/entity/User/User";
import { Passwordhelper } from "@root/helpers/PasswordHelper";
import { AnimePermissions } from "@root/permission/AnimePermissions";
import { Command, CommandProvider, Inject } from "@tsed/cli-core";
import { createConnection } from "typeorm";

export interface UserCommandContext {
    action: 'init';
}

@Command({
    name: "user",
    description: "Command description",
    args: {
        action: {
            type: String,
            defaultValue: "init",
            description: "My action"
        },
    },
    options: {},
    allowUnknownOption: false
})
export class UserComand implements CommandProvider {
    async $exec(ctx: UserCommandContext): Promise<any> {
        return [
            {
                title: "Ініцілізаці root користувача",
                task: async () => {
                    console.log(__dirname + "/../entity/**/*.ts");

                    createConnection({
                        "name": "default",
                        "type": "postgres",
                        "host": "localhost",
                        "port": 5432,
                        "username": "test",
                        "password": "test",
                        "database": "test",
                        "logging": false,
                        entities: [
                            __dirname + "/../entity/**/*.ts"
                        ],
                        synchronize: true,
                    }).then(async connection => {
                        let RUser = connection.manager.getRepository(User);
                        let RRoles = connection.manager.getRepository(Roles);

                        let role = new Roles();
                        role.name = "root";
                        role.key = "root";
                        role.permissions = ["userCreate", "userUpdate", "userDelete"];
                        role = await RRoles.save(role);

                        let user = new User();
                        user.name = "admin";
                        user.email = "admin@admin.ua";
                        user.passwordHash = await Passwordhelper.createHash("admin1");
                        user.role = role;
                        RUser.save(user);
                    }).catch(error => console.log(error))

                    return true;
                }
            }
        ];
    }
}