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

export class ImageSeed {
  constructor(public imageService: ImageService) {}

  private data: ImageData[] = [];

  seedData: imageSeedDataInterface[] = [
    {
      filename: "test1Baner.png",
      type: ImageTypeEnum.POSTER,
      path: "/resource/baner_test-1.png"
    },
    {
      filename: "test2Baner.png",
      type: ImageTypeEnum.POSTER,
      path: "/resource/baner_test-1.png"
    },
    {
      filename: "test3Baner.png",
      type: ImageTypeEnum.POSTER,
      path: "/resource/baner_test-1.png"
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
    return this.data;
  }
}
