import {Brackets, SelectQueryBuilder} from "typeorm";
import {GenresFilterData} from "../../../data/anime/filter/GenresFilterData";
import {Anime} from "../../../entity/Anime/Anime";
import {Genre} from "../../../entity/Genre/Genre";
import {FilterAbstract} from "./FilterAbstract";

export const existsQuery = <T>(builder: SelectQueryBuilder<T>) => {
  console.log(builder.getQuery());
  return `exists (${builder.getQuery()})`;
};
export class GenreFilter extends FilterAbstract {
  filter(params: GenresFilterData): SelectQueryBuilder<Anime> {
    return this.where(
      new Brackets((qb: SelectQueryBuilder<Anime>) => {
        if (params.genreParams && params.genreParams.length) {
          const builder = qb
            .subQuery()
            .select("COUNT(*)", "gcount")
            .from(Genre, "genre2")
            .leftJoin("genre2.animes", "animes2")
            .where("genre2.name IN (:...names)", {names: params.genreParams})
            .andWhere("animes2.id = anime.id");

          qb.where(`:gcount=all ${builder.getQuery()}`);
        }

        if (params.eGenreParams && params.eGenreParams.length) {
          const builder2 = qb
            .subQuery()
            .select("anime.id")
            .from(Genre, "genre3")
            .leftJoin("genre3.animes", "animes3")
            .where("genre3.name IN (:...names2)", {names2: params.eGenreParams})
            .andWhere("animes3.id = anime.id");

          qb.andWhere(`anime.id not in ${builder2.getQuery()}`);
        }
      }),
      {gcount: params.genreParams ? params.genreParams.length : 0, gcount2: params.eGenreParams ? params.eGenreParams.length : 0}
    );
  }
}
