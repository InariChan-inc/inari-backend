import {ImageData} from "@root/data/file/ImageData";
import {User} from "@root/entity/User/User";
import {TContext} from "@root/interface/Context";
import {ImageRepository} from "@root/repositories/ImageRepository";
import {UserService} from "@root/services/UserService";
import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {ValidationError} from "apollo-server-express";
import {plainToClass} from "class-transformer";
import {GraphQLUpload} from "graphql-upload";
import {Arg, Authorized, Ctx, Mutation} from "type-graphql";
import {Upload} from "../../inputs/Image/Upload";
import {ImageService} from "../../services/ImageService";
import {ImageTypeEnum} from "./ImageResolve";

@ResolverService(User)
export class AvatarResolve {
  @Inject(UserService)
  private userService: UserService;

  @Inject(ImageService)
  private imageService: ImageService;

  @Inject()
  private imageRepository: ImageRepository;

  @Authorized()
  @Mutation(() => ImageData)
  async addNewOrUpdateAvatar(
    @Arg("file", () => GraphQLUpload)
    upload: Upload,
    @Ctx() ctx: TContext
  ): Promise<ImageData> {
    const imageData = await this.imageService.create(upload, ImageTypeEnum.AVATAR, ctx.user!.id.toString());

    if (ctx.user!.avatar) {
      await this.imageRepository.softDelete(ctx.user!.avatar);
    }

    const image = await this.imageRepository.findOne(imageData.id);

    if (image) {
      this.userService.updateById({id: ctx.user!.id}, {avatar: image});
      return plainToClass(ImageData, image);
    }

    throw new ValidationError("avatarId не вірний");
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteAvatar(@Arg("avatarId") avatarId: number, @Ctx() ctx: TContext) {
    if ((await this.imageRepository.softDelete({id: ctx.user!.avatar!.id})).affected) {
      await this.userService.updateById({id: ctx.user!.id}, {avatar: undefined});
      return true;
    }

    return false;
  }
}
