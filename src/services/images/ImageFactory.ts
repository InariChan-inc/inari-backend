import {ImageBaner} from "./ImageBaner";
import {ImageInterface} from "./ImageInterface";

export class ImageFactory {
  static createImage(type: any): ImageInterface {
    let mapper: any = {baner: ImageBaner};

    return new mapper[type]();
  }
}
