import {Command, CommandProvider, Tasks} from "@tsed/cli-core";
import {BanerSeed} from "../seeds/BanerSeed";
import {ImageSeed} from "../seeds/ImageSeed";
import {ImageService} from "../services/ImageService";
import {Inject, Injectable} from "@tsed/di";
import {BanerService} from "../services/BanerService";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async $exec(ctx: SeedCommandContext): Promise<Tasks> {
    return [
      {
        title: "Ініцілізаці сідів",
        task: async () => {
          const imageSeed = new ImageSeed(this.imageService);
          const banerService = new BanerSeed(this.banerService);
          await imageSeed.init();
          await banerService.init(imageSeed.getData());
          return true;
        }
      }
    ];
  }
}
