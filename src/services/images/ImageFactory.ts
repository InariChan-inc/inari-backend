import {ImageAvatar} from "./ImageAvatar";
import {ImageBaner} from "./ImageBaner";
import {ImageInterface} from "./ImageInterface";
import {ImagePoster} from "./ImagePoster";
const mapper = {
  baner: ImageBaner,
  poster: ImagePoster,
  avatar: ImageAvatar
};

export type IMapperImages = keyof typeof mapper;
export class ImageFactory {
  static createImage(type: IMapperImages, indeficator?: string): ImageInterface {
    return new mapper[type](indeficator);
  }
}
