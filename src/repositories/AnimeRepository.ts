import {EntityRepository, Repository} from "typeorm";
import {Anime} from "@root/entity/Anime/Anime";
@EntityRepository(Anime)
export class AnimeRepository extends Repository<Anime> {}
