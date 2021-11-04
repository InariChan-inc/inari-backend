import {Command, CommandProvider, Tasks} from "@tsed/cli-core";
import {BanerSeed} from "../seeds/BanerSeed";
import {ImageSeed} from "../seeds/ImageSeed";
import {ImageService} from "../services/ImageService";
import {Inject} from "@tsed/di";
import {BanerService} from "../services/BanerService";
import {TeamSeed} from "../seeds/TeamSeed";
import {TeamService} from "../services/TeamService";

export interface SeedCommandContext {
  action: "init";
}

@Command({
  name: "seed",
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
export class SeedComand implements CommandProvider {
  @Inject()
  imageService: ImageService;
  @Inject()
  banerService: BanerService;
  @Inject()
  teamService: TeamService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async $exec(ctx: SeedCommandContext): Promise<Tasks> {
    return [
      {
        title: "Ініцілізаці сідів",
        task: async () => {
          const imageSeed = new ImageSeed(this.imageService);
          const banerService = new BanerSeed(this.banerService);
          const teamSeed = new TeamSeed(this.teamService);
          // await imageSeed.init();
          // await banerService.init(imageSeed.getData());
          await teamSeed.init();
          return true;
        }
      }
    ];
  }
}
