import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {Arg, Authorized, Ctx, Mutation, registerEnumType} from "type-graphql";
import {Images} from "../../entity/Images";
import {GraphQLUpload} from "graphql-upload";
import {Upload} from "../../inputs/Image/Upload";
import {ImageService} from "../../services/ImageService";
import {ImageData} from "../../data/file/ImageData";
import {TContext} from "@root/interface/Context";

enum ImageTypeEnum {
  BANER = "baner",
  POSTER = "poster",
  AVATAR = "avatar"
}

registerEnumType(ImageTypeEnum, {
  name: "ImageTypeEnum",
  description: "Вибреріть тип зображення"
});

@ResolverService(Images)
export class ImageResolve {
  @Inject(ImageService)
  private imageService: ImageService;

  @Authorized()
  @Mutation(() => ImageData)
  async createImage(
    @Arg("file", () => GraphQLUpload)
    upload: Upload,
    @Arg("type") type: ImageTypeEnum
  ) {
    return this.imageService.create(upload, type);
  }

  @Authorized()
  @Mutation(() => ImageData)
  async uploadAvatar(
    @Arg("file", () => GraphQLUpload)
    upload: Upload,
    @Ctx() ctx: TContext
  ) {
    return this.imageService.create(upload, ImageTypeEnum.AVATAR, ctx.user!.id.toString());
  }
}
