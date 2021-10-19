import {BanerData} from "@root/data/anime/BanerData";
import {BanerInput} from "@root/inputs/Anime/BanerInput";
import {BanerRepository} from "@root/repositories/BanerRepository";
import {ImageRepository} from "@root/repositories/ImageRepository";
import {Inject, Service} from "@tsed/di";
import {NotFound} from "@tsed/exceptions";
import {plainToClass} from "class-transformer";

@Service()
export class BanerService {
  @Inject()
  RBaner: BanerRepository;

  @Inject()
  RImage: ImageRepository;

  async create(BanerInput: BanerInput): Promise<BanerData> {
    const image = await this.RImage!.findOne(BanerInput.image_id);

    return await this.RBaner.save({
      name: BanerInput.name,
      link: BanerInput.link,
      image: image
    });
  }

  async view(id: number): Promise<BanerData> {
    const baner = await this.RBaner.findOne(id, {relations: ["image"]});

    if (baner === undefined) {
      throw new NotFound("baner not found");
    }

    return plainToClass(BanerData, baner);
  }

  async all() {
    const baners = await this.RBaner.find({relations: ["image"]});
    return baners.map((baner) => plainToClass(BanerData, baner));
  }

  async delete(id: number) {
    const deleteResult = await this.RBaner.delete({id});
    if (deleteResult.affected! >= 1) {
      return true;
    }

    return false;
  }
}
