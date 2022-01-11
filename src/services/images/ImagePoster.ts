import {ImageInput, ImageTypeEnum} from "@root/inputs/Image/ImageInput";
import {Upload} from "@root/inputs/Image/Upload";
import {createWriteStream, mkdirSync, stat} from "fs";
import {ImageInterface} from "./ImageInterface";
import {ImageValidate} from "./ImageValidate";

import gm = require("gm");

export class ImagePoster implements ImageInterface {
  private pathOriginal = "resources/images/poster/original";
  private pathReduced = "resources/images/poster/500x500";

  async saveFile(upload: Upload): Promise<ImageInput> {
    if (!((await this.existDirAndCreate(this.pathOriginal)) && (await this.existDirAndCreate(this.pathReduced)))) {
      throw new Error("error create mkdir");
    }

    await new ImageValidate(upload, {filesize: 1024 * 10000, minHeight: 400, minWidth: 245}).validate();

    return new Promise<ImageInput>(async (resolve, reject) => {
      const fullPath = __dirname + `/../../../` + this.pathOriginal + "/" + upload.filename;
      upload
        .createReadStream()
        .pipe(createWriteStream(fullPath))
        .on("finish", async () => {
          resolve(
            new Promise<ImageInput>((res) => {
              gm(fullPath)
                .resize(400, 245)
                .write(this.pathReduced + "/" + upload.filename, () => {
                  const imageInput = new ImageInput();
                  imageInput.name = upload.filename;
                  imageInput.path = this.pathOriginal + "/" + upload.filename;
                  imageInput.pathResized = this.pathReduced + "/" + upload.filename;
                  imageInput.type = ImageTypeEnum.BANER;
                  res(imageInput);
                });
            })
          );
        })
        .on("error", (e) => {
          console.log(e);
          reject(false);
        });
    });
  }

  async existDirAndCreate(path: string) {
    return await new Promise<boolean>((res) => {
      stat(__dirname + `/../../../` + path, (err, stat) => {
        if (!err) {
          res(true);
        } else if (err.code === "ENOENT") {
          mkdirSync(__dirname + `/../../../` + path, {recursive: true});
          res(true);
        }
        res(false);
      });
    });
  }
}
