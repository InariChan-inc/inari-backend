import {Permission} from "@root/entity/User/Permission";
import {AnimePermissions} from "@root/permission/AnimePermissions";
import {PermissionService} from "@root/services/PermissionService";
import {Command, CommandProvider, Inject} from "@tsed/cli-core";
import {plainObjectToClass} from "@tsed/json-mapper";
import {Roles} from "../entity/User/Roles";
import {RolesRepository} from "../repositories/RolesRepository";
import {plainToClass} from "class-transformer";

export interface RolesCommandContext {
  action: "init";
}

@Command({
  name: "roles",
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
export class RolesComand implements CommandProvider {
  @Inject()
  protected RRoles: RolesRepository;

  protected rolesData = [
    {
      name: "user",
      key: "user",
      permissions: []
    },
    {
      name: "root",
      key: "root",
      permissions: ["userCreate", "userUpdate", "userDelete", "createBaner", "updateBaner", "deleteBaner"]
    }
  ];

  async $exec(ctx: RolesCommandContext): Promise<any> {
    return [
      {
        title: "Ініцілізаці ролей",
        task: async () => {
          for (let index in this.rolesData) {
            let roleData = this.rolesData[index];

            let role = await this.RRoles.findOne({key: roleData.key});

            if (!role) {
              role = plainToClass(Roles, roleData);
              await this.RRoles.save(role);
              return;
            }

            await this.RRoles.update({id: role.id}, roleData);
            console.log(`done`);
          }
        }
      }
    ];
  }
}
