import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {Anime} from "@root/entity/Anime/Anime";
import {AnimeService} from "@root/services/AnimeService";
import {Arg, Authorized, Ctx, Mutation, Query} from "type-graphql";
import {AnimeInput} from "@root/inputs/Anime/AnimeInput";
import {AnimeData} from "@root/data/anime/AnimeData";
import {Pageable} from "@root/data/pageable/Pageable";
import {AnimePagination} from "@root/data/pageable/AnimePagination";
import {IPaginatedResponse} from "@root/data/pageable/PaginatedResponse";
import {TContext} from "../../interface/Context";
import {GenreRepository} from "../../repositories/GenreRepository";
import {Genre} from "../../entity/Genre/Genre";

@ResolverService(Anime)
export class AnimeResolve {
  @Inject(AnimeService)
  private animeService: AnimeService;

  @Inject(GenreRepository)
  private genreRepository: GenreRepository;

  @Authorized("createAnime")
  @Mutation(() => AnimeData)
  createAnime(@Arg("data") animeInput: AnimeInput): Promise<Anime> {
    return this.animeService.create(animeInput);
  }

  @Query(() => AnimeData)
  async viewAnime(@Arg("id") id: number, @Ctx() ctx: TContext): Promise<AnimeData> {
    const anime = await this.animeService.view(id, ctx.req?.connection.remoteAddress);

    return anime;
  }

  @Query(() => AnimePagination)
  async animes(@Arg("data") pageable: Pageable): Promise<IPaginatedResponse> {
    const anime = await this.animeService.index(pageable);

    return anime;
  }

  @Query(() => [AnimeData])
  async topAnimeMonth(): Promise<AnimeData[]> {
    return this.animeService.topAnimeMonth();
  }

  @Query(() => [Genre])
  async genres(): Promise<Genre[]> {
    return this.genreRepository.find();
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
