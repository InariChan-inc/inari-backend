import {ImageInput} from "@root/inputs/Image/ImageInput";
import {Upload} from "@root/inputs/Image/Upload";
import {ImageRepository} from "@root/repositories/ImageRepository";
import {Inject, Service} from "@tsed/di";
import {UseConnection} from "@tsed/typeorm";
import {rejects} from "assert";
import {plainToClass} from "class-transformer";
import {createWriteStream} from "fs";
import {ImageInterface} from "./ImageInterface";

@Service()
export class ImageBaner implements ImageInterface {
  @Inject()
  @UseConnection("default")
  private imageRepository: ImageRepository;

  async load(upload: Upload): Promise<ImageData> {
    return new Promise<ImageData>((resolve, reject) => {
      let path = `resources/images/baner/${upload.filename}`;
      upload
        .createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../${path}`))
        .on("finish", async () => {
          let imageInput = new ImageInput();
          imageInput.name = __filename;
          imageInput.path = path;
          resolve(plainToClass(ImageData, await this.imageRepository.save(imageInput)));
        })
        .on("error", (e) => {
          console.log(e);
          reject(false);
        });
    });
  }
}
