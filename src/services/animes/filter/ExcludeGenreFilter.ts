import {SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {Genre} from "../../../entity/Genre/Genre";
import {FilterAbstract} from "./FilterAbstract";

export class ExludeGenreFilter extends FilterAbstract {
  filter(params: string[]): SelectQueryBuilder<Anime> {
    console.log(this.index);
    //this.animeQuery.leftJoin("anime.genres", "genres2");
    return this.animeQuery.andWhere(
      (qb: SelectQueryBuilder<Genre>) => {
        const builder = qb
          .subQuery()
          .select("anime.id")
          .from(Genre, "genre3")
          .leftJoin("genre3.animes", "animes3")
          .where("genre3.name IN (:...names)", {names: params})
          .andWhere("animes3.id = anime.id");

        return `anime.id in (${builder.getQuery()})`;
      },
      {gcount: params.length}
    );
  }
}
