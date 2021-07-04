import { Permission } from "@root/entity/User/Permission";
import { AnimePermissions } from "@root/permission/AnimePermissions";
import { PermissionRepository } from "@root/repositories/PermissionRepository";
import { PermissionService } from "@root/services/PermissionService";
import { Command, CommandProvider, Inject } from "@tsed/cli-core";
import { TypeORMService, UseConnection } from "@tsed/typeorm";
import { Connection } from "typeorm";

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
    @Inject()
    @UseConnection("default")
    permissionRepository: PermissionRepository;

    // private connection: Connection;

    // constructor(private typeORMService: TypeORMService) {
    //     this.connection = this.typeORMService.get("default");
    // }

    async $exec(ctx: PermissionCommandContext): Promise<any> {
        return [
            {
                title: "Ініцілізаці пермішін",
                task: async () => {
                    console.log(this.permissionRepository);
                   // console.log(this.connection);
                    //this[ctx.action]();
                }
            }
        ];
    }

    async init() {
        // let animePrms = AnimePermissions.get();
        // console.log(this.permissionService);

        // for (const index in animePrms) {
        //     let prmAction = animePrms[index];
        //     let prm = new Permission();

        //     if (!await this.permissionService.findOne({ key: prmAction.key })) {
        //         prm.key = prmAction.key;
        //         prm.resolves = prmAction.resolves;
        //         this.permissionService.create(prm);
        //     }

        //     console.log(`done`);
        // }
    }
}