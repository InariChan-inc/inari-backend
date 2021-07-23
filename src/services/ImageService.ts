import {Inject, Service} from "@tsed/common";
import {UseConnection} from "@tsed/typeorm";
import {PermissionRepository} from "@root/repositories/PermissionRepository";
import {Permission} from "@root/entity/User/Permission";
import {ImageRepository} from "../repositories/ImageRepository";
import {UserInput} from "../inputs/User/UserInput";
import {plainToClass} from "class-transformer";
import { ImageInput } from "../inputs/Image/ImageInput";
import { ImageData } from "../data/file/ImageData";

@Service()
export class ImageService {
  @Inject()
  @UseConnection("default")
  private imageRepository: ImageRepository;

  public async create(imageInput: ImageInput) {
    return plainToClass(ImageData, await this.imageRepository.save(imageInput));
  }
}
