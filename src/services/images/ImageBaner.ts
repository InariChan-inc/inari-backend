import {ImageInput, ImageTypeEnum} from "@root/inputs/Image/ImageInput";
import {Upload} from "@root/inputs/Image/Upload";
import {ImageRepository} from "@root/repositories/ImageRepository";
import {ConsoleAppender} from "@tsed/cli-core";
import {Inject, Service} from "@tsed/di";
import {UseConnection} from "@tsed/typeorm";
import {rejects} from "assert";
import {plainToClass} from "class-transformer";
import {createWriteStream, fstat, mkdir, mkdirSync, ReadStream, stat, statSync} from "fs";
import {ImageData} from "../../data/file/ImageData";
import {ImageInterface} from "./ImageInterface";
import gm = require("gm");
import {ValidationError} from "@tsed/common";
import {createReadStream} from "node:fs";
import {ImageValidate} from "./ImageValidate";
export class ImageBaner implements ImageInterface {
  private path = "resources/images/baner";

  async saveFile(upload: Upload): Promise<ImageInput> {
    if (!(await this.existDirAndCreate())) {
      throw new Error("error create mkdir");
    }

    await new ImageValidate(upload, {filesize: 1024 * 1000, minHeight: 460, minWidth: 1660}).validate();

    return new Promise<ImageInput>(async (resolve, reject) => {
      upload
        .createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../` + this.path + "/" + upload.filename))
        .on("finish", async () => {
          const imageInput = new ImageInput();
          imageInput.name = upload.filename;
          imageInput.path = this.path + "/" + upload.filename;
          imageInput.type = ImageTypeEnum.BANER;
          resolve(imageInput);
        })
        .on("error", (e) => {
          console.log(e);
          reject(false);
        });
    });
  }

  async existDirAndCreate() {
    return await new Promise<boolean>((res) => {
      stat(__dirname + `/../../../` + this.path, (err, stat) => {
        if (!err) {
          res(true);
        } else if (err.code === "ENOENT") {
          mkdirSync(__dirname + `/../../../` + this.path, {recursive: true});
          res(true);
        }
        res(false);
      });
    });
  }
}
