import {ImageInput, ImageTypeEnum} from "@root/inputs/Image/ImageInput";
import {Upload} from "@root/inputs/Image/Upload";
import {createWriteStream, mkdirSync, stat} from "fs";
import {ImageInterface} from "./ImageInterface";
import {ImageValidate} from "./ImageValidate";
import {v4 as uuidv4} from "uuid";

import gm = require("gm");

export class ImagePoster implements ImageInterface {
  private pathOriginal = "resources/images/poster/tpm/original";
  private pathReduced = "resources/images/poster/tpm/500x500";

  async saveFile(upload: Upload): Promise<ImageInput> {
    if (!((await this.existDirAndCreate(this.pathOriginal)) && (await this.existDirAndCreate(this.pathReduced)))) {
      throw new Error("error create mkdir");
    }

    const filename = uuidv4() + "." + upload.filename.substr(upload.filename.lastIndexOf(".") + 1);

    await new ImageValidate(upload, {filesize: 1024 * 1000, minHeight: 400, minWidth: 600}).validate();

    return new Promise<ImageInput>(async (resolve, reject) => {
      const fullPath = __dirname + `/../../../` + this.pathOriginal + "/" + filename;

      upload
        .createReadStream()
        .pipe(createWriteStream(fullPath))
        .on("finish", async () => {
          resolve(
            new Promise<ImageInput>((res, rej) => {
              gm(fullPath)
                .resize(500, 500)
                .write(this.pathReduced + "/" + filename, () => {
                  const imageInput = new ImageInput();
                  imageInput.name = filename;
                  imageInput.path = this.pathOriginal + "/" + filename;
                  imageInput.pathResized = this.pathReduced + "/" + filename;
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
