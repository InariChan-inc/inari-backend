import {BanerService} from "../services/BanerService";
import * as async from "async";

export class BanerSeed {
  seedData = [
    {
      name: "test1Baner",
      link: "test",
      imageId: 1
    },
    {
      name: "test2Baner",
      link: "test",
      imageId: 1
    },
    {
      name: "test3Baner",
      link: "test",
      imageId: 1
    }
  ];

  relationData: any;

  constructor(public banerService: BanerService) {}

  async init(relationData: any = []): Promise<void> {
    await async.eachOf(this.seedData, async (elem, index) => {
      await this.banerService.create({
        image_id: relationData[index].id,
        name: elem.name,
        link: elem.link
      });
    });
  }
}
