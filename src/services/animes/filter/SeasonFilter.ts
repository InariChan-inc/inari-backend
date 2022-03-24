import {SelectQueryBuilder} from "typeorm";
import {Anime, SeasonAnimeEnum} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class SeasonFilter extends FilterAbstract {
  filter(params: SeasonAnimeEnum): SelectQueryBuilder<Anime> {
    return this.where("Anime.season = :params", {params});
  }
}
