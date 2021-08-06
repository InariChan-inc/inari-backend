import {ImageAvatar} from "./ImageAvatar";
import {ImageBaner} from "./ImageBaner";
import {ImageInterface} from "./ImageInterface";
import {ImagePoster} from "./ImagePoster";

export class ImageFactory {
  static createImage(type: any, indeficator?: string): ImageInterface {
    const mapper: any = {
      baner: ImageBaner,
      poster: ImagePoster,
      avatar: ImageAvatar
    };

    return new mapper[type](indeficator);
  }
}
