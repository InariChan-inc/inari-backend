import {Brackets, SelectQueryBuilder} from "typeorm";
import {Anime} from "../../../entity/Anime/Anime";
import {Genre} from "../../../entity/Genre/Genre";
import {FilterAbstract} from "./FilterAbstract";

export const existsQuery = <T>(builder: SelectQueryBuilder<T>) => {
  console.log(builder.getQuery());
  return `exists (${builder.getQuery()})`;
};
export class GenreFilter extends FilterAbstract {
  filter(params: string[]): SelectQueryBuilder<Anime> {
    // this.animeQuery.addSelect(
    //   (qb: SelectQueryBuilder<Anime>) =>
    //     qb
    //       .from(Genre, "genre")
    //       .select("COUNT(*)", "gcount")
    //       .leftJoin("genre.animes", "animes")
    //       .where(
    //         new Brackets((qb) => {
    //           for (const key in params) {
    //             qb.andWhere("genres.name=:name", {name: params[key]});
    //           }
    //         })
    //       )
    //       .limit(1),
    //   "gcount"
    // );

    // this.animeQuery.getRawMany().then((animeCount) => {
    //   console.log(animeCount);
    // });
    //this.animeQuery.having("animecount > 0");

    //return this.animeQuery;

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
      {gcount: params.length}
    );

    return this.animeQuery;

    return this.animeQuery.where(
      // (qb: SelectQueryBuilder<Anime>) => {
      //   const subQuery = qb.subQuery().from(Genre, "genre").where("genre.registered = :registered").getQuery();
      //   return "post.title IN " + subQuery;
      // }
      new Brackets((qb) => {
        //for (const key in params) {
        qb.where((qb: SelectQueryBuilder<Genre>) =>
          existsQuery(
            qb
              .subQuery()
              .select("*")
              .from(Genre, "genre2")
              .leftJoin("genre2.animes", "animes2")
              .where("genre2.name = :name", {name: params[0]})
              .andWhere("animes2.id = anime.id")
          )
        ).orWhere((qb: SelectQueryBuilder<Genre>) =>
          existsQuery(
            qb
              .subQuery()
              .select("*")
              .from(Genre, "genre2")
              .leftJoin("genre2.animes", "animes2")
              .where("genre2.name = :name", {name: params[1]})
              .andWhere("animes2.id = anime.id")
          )
        );
        //}
      })
    );
  }
}
