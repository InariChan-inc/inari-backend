import {EntityRepository, Repository} from "typeorm";
import {Images} from "../entity/Images";
@EntityRepository(Images)
export class ImageRepository extends Repository<Images> {}
