import {ImageData} from "@root/data/file/ImageData";
import {User} from "@root/entity/User/User";
import {TContext} from "@root/interface/Context";
import {ImageRepository} from "@root/repositories/ImageRepository";
import {UserService} from "@root/services/UserService";
import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {ValidationError} from "apollo-server-express";
import {plainToClass} from "class-transformer";
import {Arg, Authorized, Ctx, Mutation} from "type-graphql";

@ResolverService(User)
export class AvatarResolve {
  @Inject(UserService)
  private userService: UserService;

  @Inject()
  private imageRepository: ImageRepository;

  @Authorized()
  @Mutation(() => ImageData)
  async addNewOrUpdateAvatar(@Arg("avatarId") avatarId: number, @Ctx() ctx: TContext) {
    if (ctx.user!.avatar) {
      await this.imageRepository.softDelete(ctx.user!.avatar);
    }

    const image = await this.imageRepository.findOne(avatarId);

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
