import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class GenreFilter extends FilterAbstract {
  filter(params: string[], animeQuery: SelectQueryBuilder<Anime>): SelectQueryBuilder<Anime> {
    return animeQuery.where("genres.name IN(:...names)", {names: params});
  }
}
