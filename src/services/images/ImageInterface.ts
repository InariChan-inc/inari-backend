import { Upload } from "@root/inputs/Image/Upload";

export interface ImageInterface {
  load(upload: Upload): Promise<ImageData>;
}
