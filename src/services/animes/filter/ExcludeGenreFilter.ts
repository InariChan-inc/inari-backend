import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {Genre} from "../../../entity/Genre/Genre";
import {FilterAbstract} from "./FilterAbstract";

export class ExludeGenreFilter extends FilterAbstract {
  filter(params: string[]): SelectQueryBuilder<Anime> {
    return this.where(
      (qb: SelectQueryBuilder<Genre>) => {
        const builder = qb
          .subQuery()
          .select("COUNT(*)", "gcount")
          .from(Genre, "genre2")
          .leftJoin("genre2.animes", "animes2")
          .where("genre2.name IN (:...names)", {names: params})
          .andWhere("animes2.id = anime.id");

        return `:gcount=all (${builder.getQuery()})`;
      },
      {gcount: 0}
    );
  }
}
