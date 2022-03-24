import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";

export abstract class FilterAbstract {
  abstract filter(params: string[], animeQuery: SelectQueryBuilder<Anime>): SelectQueryBuilder<Anime>;
}
