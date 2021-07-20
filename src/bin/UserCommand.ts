import {Roles} from "@root/entity/User/Roles";
import {User} from "@root/entity/User/User";
import {Passwordhelper} from "@root/helpers/PasswordHelper";
import {Command, CommandProvider, Inject} from "@tsed/cli-core";
import {plainObjectToClass} from "@tsed/json-mapper";
import {UseConnection} from "@tsed/typeorm";
import {RolesRepository} from "../repositories/RolesRepository";
import {UserRepository} from "../repositories/UserRepository";

export interface UserCommandContext {
  action: "init";
}

@Command({
  name: "user",
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
export class UserComand implements CommandProvider {
  @Inject()
  protected RUser: UserRepository;

  @Inject()
  protected RRoles: RolesRepository;

  async $exec(ctx: UserCommandContext): Promise<any> {
    return [
      {
        title: "Ініцілізаці root користувача",
        task: async () => {

          let user = new User();
          user.name = "admin";
          user.email = "admin@admin.ua";
          user.passwordHash = await Passwordhelper.createHash("admin1");
          let role = await this.RRoles.findOne({key: "root"});
          
          if (role) {
            user.role = role;
          }

          await this.RUser.save(user);
        }
      }
    ];
  }
}
