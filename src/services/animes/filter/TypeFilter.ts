import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {FilterAbstract} from "./FilterAbstract";

export class TypeFilter extends FilterAbstract {
  filter(params: string[]): SelectQueryBuilder<Anime> {
    return this.where("anime.format = :format", {format: params});
  }
}
