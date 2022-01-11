import {Command, CommandProvider, Tasks} from "@tsed/cli-core";
import {BanerSeed} from "../seeds/BanerSeed";
import {ImageSeed} from "../seeds/ImageSeed";
import {ImageService} from "../services/ImageService";
import {Inject} from "@tsed/di";
import {BanerService} from "../services/BanerService";
import {TeamSeed} from "../seeds/TeamSeed";
import {TeamService} from "../services/TeamService";
import {AnimeSeed} from "../seeds/AnimeSeed";
import {AnimeService} from "../services/AnimeService";
import {ImageAnimePosterSeed} from "../seeds/ImageAnimePosterSeed";

export interface SeedCommandContext {
  action: string;
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
  @Inject()
  animeService: AnimeService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async $exec(ctx: SeedCommandContext): Promise<Tasks> {
    return [
      {
        title: "Ініцілізаці сідів",
        task: async () => {
          if (ctx.action === "anime") {
            const imageAnimePosterSeed = new ImageAnimePosterSeed(this.imageService);
            const animeSeed = new AnimeSeed(this.animeService);
            await imageAnimePosterSeed.init();
            await animeSeed.init(imageAnimePosterSeed.getData());
            return true;
          }

          const imageSeed = new ImageSeed(this.imageService);
          const imageAnimePosterSeed = new ImageAnimePosterSeed(this.imageService);
          const banerService = new BanerSeed(this.banerService);
          const teamSeed = new TeamSeed(this.teamService);
          const animeSeed = new AnimeSeed(this.animeService);
          await imageSeed.init();
          await imageAnimePosterSeed.init();
          await banerService.init(imageSeed.getData());
          await teamSeed.init();
          await animeSeed.init(imageAnimePosterSeed.getData());
          return true;
        }
      }
    ];
  }
}
