import {ImageBaner} from "./ImageBaner";
import {ImageInterface} from "./ImageInterface";
import {ImagePoster} from "./ImagePoster";

export class ImageFactory {
  static createImage(type: any): ImageInterface {
    let mapper: any = {
      baner: ImageBaner,
      poster: ImagePoster
    };

    return new mapper[type]();
  }
}
