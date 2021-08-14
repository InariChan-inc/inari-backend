import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {Anime} from "@root/entity/Anime/Anime";
import {AnimeService} from "@root/services/AnimeService";
import {Arg, Mutation, Query} from "type-graphql";
import {AnimeInput} from "@root/inputs/Anime/AnimeInput";
import {AnimeData} from "@root/data/anime/AnimeData";
import {Pageable} from "@root/data/pageable/Pageable";
import {AnimePagination} from "@root/data/pageable/AnimePagination";
import {IPaginatedResponse} from "@root/data/pageable/PaginatedResponse";

@ResolverService(Anime)
export class AnimeResolve {
  @Inject(AnimeService)
  private animeService: AnimeService;

  @Mutation(() => AnimeData)
  createAnime(@Arg("data") animeInput: AnimeInput): Promise<Anime> {
    return this.animeService.create(animeInput);
  }

  @Query(() => AnimeData)
  async viewAnime(@Arg("id") id: number): Promise<AnimeData> {
    const anime = await this.animeService.findById(id);

    return anime;
  }

  @Query(() => AnimePagination)
  async animes(@Arg("data") pageable: Pageable): Promise<IPaginatedResponse> {
    const anime = await this.animeService.index(pageable);

    return anime;
  }

  @Query(() => [AnimeData])
  async lastUpdatedAnime(): Promise<AnimeData[]> {
    return this.animeService.lastUpdatedAnime();
  }

  @Query(() => [AnimeData])
  async lastAddedAnime(): Promise<AnimeData[]> {
    return this.animeService.lastAddedAnime();
  }
}
