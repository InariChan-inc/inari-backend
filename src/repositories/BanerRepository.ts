import {EntityRepository, Repository} from "typeorm";
import {Baner} from "@root/entity/Anime/Baner";
@EntityRepository(Baner)
export class BanerRepository extends Repository<Baner> {}
