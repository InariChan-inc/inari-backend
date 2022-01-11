import * as fs from "fs";
import {ImageTypeEnum} from "../inputs/Image/ImageInput";
import {ImageService} from "../services/ImageService";
import {Upload} from "../inputs/Image/Upload";
import * as async from "async";
import {ImageData} from "../data/file/ImageData";

interface imageSeedDataInterface {
  filename: string;
  type: number;
  path: string;
}

export class ImageAnimePosterSeed {
  constructor(public imageService: ImageService) {}

  private data: ImageData[] = [];

  seedData: imageSeedDataInterface[] = [
    {
      filename: "test1Poster.png",
      type: ImageTypeEnum.POSTER,
      path: "/resource/poster/Poster-Takt Op. Destiny-3.1-2.png"
    },
    {
      filename: "test2Poster.png",
      type: ImageTypeEnum.POSTER,
      path: "/resource/poster/anime-Love-of-Kill-poster-3.0.png"
    },
    {
      filename: "test3Poster.png",
      type: ImageTypeEnum.POSTER,
      path: "/resource/poster/baner_test.png"
    }
  ];

  async init(): Promise<void> {
    await async.each(this.seedData, async (elem) => {
      const upload: Upload = {
        filename: elem.filename,
        mimetype: "image/png",
        encoding: "png",
        createReadStream: () => fs.createReadStream(__dirname + elem.path)
      };

      const imageData = await this.imageService.create(upload, "poster");

      this.data.push(imageData);
    });
  }

  getData(): ImageData[] {
    console.log(this.data);
    return this.data;
  }
}
