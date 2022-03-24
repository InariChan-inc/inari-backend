import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class GenreFilter extends FilterAbstract {
  filter(params: string[]): SelectQueryBuilder<Anime> {
    return this.where("genres.name IN(:...names)", {names: params});
  }
}
