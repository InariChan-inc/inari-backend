import {Brackets, ObjectLiteral, SelectQueryBuilder} from "typeorm";
import {Anime, SeasonAnimeEnum} from "../../../entity/Anime/Anime";

export abstract class FilterAbstract {
  private index: number;
  protected animeQuery: SelectQueryBuilder<Anime>;

  setAnimeQuery(animeQuery: SelectQueryBuilder<Anime>): void {
    this.animeQuery = animeQuery;
  }

  setIndex(index: number): void {
    this.index = index;
  }

  abstract filter(params: string[] | string | SeasonAnimeEnum): SelectQueryBuilder<Anime>;

  where(where: string | Brackets | any, parameters?: ObjectLiteral): SelectQueryBuilder<Anime> {
    if (this.index === 0) {
      return this.animeQuery.where(where, parameters);
    }

    return this.animeQuery.andWhere(where, parameters);
  }
}
