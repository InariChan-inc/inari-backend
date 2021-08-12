import {Anime} from "@root/entity/Anime/Anime";
import {Permission} from "@root/entity/User/Permission";
import {User} from "@root/entity/User/User";
import {AnimePermissions} from "@root/permission/AnimePermissions";
import {PermissionRepository} from "@root/repositories/PermissionRepository";
import {PermissionService} from "@root/services/PermissionService";
import {Command, CommandProvider, Inject} from "@tsed/cli-core";
import {TypeORMService, UseConnection} from "@tsed/typeorm";
import {Connection, createConnection} from "typeorm";

export interface PermissionCommandContext {
  action: "init";
}

@Command({
  name: "permission",
  description: "Command description",
  args: {
    action: {
      type: String,
      defaultValue: "init",
      description: "My action"
    }
  },
  options: {},
  allowUnknownOption: false
})
export class PermissionComand implements CommandProvider {
  @Inject()
  protected SPermission: PermissionService;

  async $exec(ctx: PermissionCommandContext): Promise<any> {
    return [
      {
        title: "Ініцілізаці пермішін",
        task: async () => {
          const animePrms = AnimePermissions.get();

          for (const index in animePrms) {
            const prmAction = animePrms[index];
            const prm = new Permission();

            if (!(await this.SPermission.findOne({key: prmAction.key}))) {
              prm.key = prmAction.key;
              prm.resolves = prmAction.resolves;
              console.log(`сreate`);
              this.SPermission.create(prm);
            }

            console.log(`done`);
          }
          return true;
        }
      }
    ];
  }
}
