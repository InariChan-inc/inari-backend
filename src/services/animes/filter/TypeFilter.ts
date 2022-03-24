import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class TypeFilter extends FilterAbstract {
  filter(params: string[], animeQuery: SelectQueryBuilder<Anime>): SelectQueryBuilder<Anime> {
    return animeQuery.where("anime.season = :season", {season: params});
  }
}
