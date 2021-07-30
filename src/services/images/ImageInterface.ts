import {Upload} from "@root/inputs/Image/Upload";
import {ImageInput} from "../../inputs/Image/ImageInput";

export interface ImageInterface {
  saveFile(upload: Upload): Promise<ImageInput>;

  existDirAndCreate(path: string): Promise<boolean>;
}
