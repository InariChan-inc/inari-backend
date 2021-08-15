import {Upload} from "../../inputs/Image/Upload";
import gm = require("gm");
import {ImageSizeInterface} from "./ImageSizeInterface";
import {ValidationError} from "apollo-server-express";

export class ImageValidate {
  private upload: Upload;
  private imageSize: ImageSizeInterface;

  constructor(upload: Upload, imageSize: ImageSizeInterface) {
    this.upload = upload;
    this.imageSize = imageSize;
  }

  async validate(): Promise<void> {
    if (!this.isImage()) {
      throw new ValidationError(`allow only image`);
    }

    if (!(await this.filesize())) {
      throw new ValidationError(`maxFilesize: 1mb`);
    }

    if (!(await this.validateSize())) {
      throw new ValidationError(`minWidth: ${this.imageSize.minWidth}, minHeight: ${this.imageSize.minHeight}`);
    }
  }

  private isImage() {
    if (["image/png", "image/jpeg"].includes(this.upload.mimetype)) {
      return true;
    }

    return false;
  }

  private async validateSize() {
    const imageGm = gm(this.upload.createReadStream());

    return await new Promise<boolean>((res) => {
      imageGm.size({bufferStream: true}, (err, size) => {
        console.log(err);
        if (err) {
          res(false);
        }

        if (this.imageSize.minWidth <= size.width && this.imageSize.minHeight <= size.height) {
          res(true);
        }

        res(false);
      });
    });
  }

  private async filesize() {
    const uploadStream = this.upload.createReadStream();
    let byteLength = 0;
    return await new Promise<boolean>(async (res) => {
      for await (const uploadChunk of uploadStream) {
        byteLength += (uploadChunk as Buffer).byteLength;

        if (byteLength > this.imageSize.filesize) {
          res(false);
        }
      }
      res(true);
    });
  }
}
