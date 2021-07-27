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
export class ImageBaner implements ImageInterface {
  private path = "resources/images/baner";

  private minHeight = 460;
  private minWidth = 1660;
  private maxFilesize = 1024 * 1000;

  async saveFile(upload: Upload): Promise<ImageInput> {
    if (!(await this.existDirAndCreate())) {
      throw new Error("error create mkdir");
    }

    if (!this.isImage(upload.mimetype)) {
      throw new ValidationError(`allow only image`);
    }

    let imageGm = gm(upload.createReadStream());

    if (!(await this.filesize(upload))) {
      throw new ValidationError(`maxFilesize: 1mbl`);
    }

    if (!(await this.validateSize(imageGm))) {
      throw new ValidationError(`minWidth: ${this.minWidth}, minHeight: ${this.minHeight}`);
    }

    return new Promise<ImageInput>(async (resolve, reject) => {
      upload
        .createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../` + this.path + "/" + upload.filename))
        .on("finish", async () => {
          let imageInput = new ImageInput();
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

  async validateSize(gm: gm.State) {
    return await new Promise<boolean>((res) => {
      gm.size({bufferStream: true}, (err, size) => {
        if (this.minWidth >= size.width && this.minHeight >= size.height) {
          res(true);
        }
        res(false);
      });
    });
  }

  async filesize(upload: Upload) {
    var uploadStream = upload.createReadStream();
    let byteLength = 0;
    return await new Promise<boolean>(async (res) => {
      for await (const uploadChunk of uploadStream) {
        byteLength += (uploadChunk as Buffer).byteLength;

        if (byteLength > this.maxFilesize) {
          res(false);
        }
      }
      res(true);
    });
  }

  isImage(minetype: string) {
    if (["image/png", "image/jpeg"].includes(minetype)) {
      return true;
    }

    return false;
  }
}
