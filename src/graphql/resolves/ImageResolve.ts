import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {UserService} from "../../services/UserService";
import {Arg, Mutation} from "type-graphql";
import {UserInput} from "../../inputs/User/UserInput";
import {Images} from "../../entity/Images";
import {GraphQLUpload} from "graphql-upload";
import {createWriteStream} from "fs";
import {Upload} from "../../inputs/Image/Upload";
import {ImageService} from "../../services/ImageService";
import {ImageInput} from "../../inputs/Image/ImageInput";
import { ImageData } from "../../data/file/ImageData";

@ResolverService(Images)
export class ImageResolve {
  @Inject(UserService)
  private userService: UserService;

  @Inject(ImageService)
  private imageService: ImageService;

  @Mutation(() => ImageData)
  async createImage(
    @Arg("file", () => GraphQLUpload)
    {createReadStream, filename}: Upload
  ) {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../resources/images/${filename}`))
        .on("finish", () => {
          let imageInput = new ImageInput();
          imageInput.name = filename;
          imageInput.path = `resources/images/${filename}`;
          resolve(this.imageService.create(imageInput));
        })
        .on("error", (e) => {
          console.log(e);
          reject(false);
        })
    );
  }
}
