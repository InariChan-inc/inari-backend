import { Anime } from "@root/entity/Anime/Anime";
import { Permission } from "@root/entity/User/Permission";
import { User } from "@root/entity/User/User";
import { AnimePermissions } from "@root/permission/AnimePermissions";
import { PermissionRepository } from "@root/repositories/PermissionRepository";
import { PermissionService } from "@root/services/PermissionService";
import { Command, CommandProvider, Inject } from "@tsed/cli-core";
import { TypeORMService, UseConnection } from "@tsed/typeorm";
import { Connection, createConnection } from "typeorm";

export interface PermissionCommandContext {
    action: 'init';
}

@Command({
    name: "permission",
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
export class PermissionComand implements CommandProvider {
    async $exec(ctx: PermissionCommandContext): Promise<any> {
        return [
            {
                title: "Ініцілізаці пермішін",
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
                        let RPermission = connection.manager.getRepository(Permission);

                        let animePrms = AnimePermissions.get();

                        for (const index in animePrms) {
                            let prmAction = animePrms[index];
                            let prm = new Permission();

                            if (!await RPermission.findOne({ key: prmAction.key })) {
                                prm.key = prmAction.key;
                                prm.resolves = prmAction.resolves;
                                RPermission.save(prm);
                            }

                            console.log(`done`);
                        }
                        return true;
                    }).catch(error => console.log(error))
                }
            }
        ];
    }
}