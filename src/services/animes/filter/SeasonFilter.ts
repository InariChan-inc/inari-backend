import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class SeasonFilter extends FilterAbstract {
  filter(params: string): SelectQueryBuilder<Anime> {
    return animeQuery.where("Anime.name like :params", {params: `%${params}%`});
  }
}
