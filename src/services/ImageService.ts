import {Inject, Service} from "@tsed/common";
import {UseConnection} from "@tsed/typeorm";
import {ImageRepository} from "../repositories/ImageRepository";
import {plainToClass} from "class-transformer";
import {ImageData} from "../data/file/ImageData";
import {Upload} from "@root/inputs/Image/Upload";
import {ImageFactory} from "./images/ImageFactory";
import {Images} from "../entity/Images";

@Service()
export class ImageService {
  @Inject()
  @UseConnection("default")
  private imageRepository: ImageRepository;

  public async create(upload: Upload, type: string, indeficator?: string): Promise<ImageData> {
    const imageFile = ImageFactory.createImage(type, indeficator);
    const imageInput = await imageFile.saveFile(upload);
    const image = await this.imageRepository.save(plainToClass(Images, imageInput));

    return plainToClass(ImageData, image);
  }
}
