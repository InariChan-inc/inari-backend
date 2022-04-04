import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class SearchFilter extends FilterAbstract {
  filter(params: string): SelectQueryBuilder<Anime> {
    return this.where("LOWER(Anime.name) like LOWER(:name)", {name: `%${params.toLowerCase()}%`});
  }
}
