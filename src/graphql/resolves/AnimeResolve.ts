import { Inject } from "@tsed/di";
import { ResolverService } from "@tsed/graphql";
import { Anime } from "@root/entity/Anime/Anime";
import { AnimeService } from "@root/services/AnimeService";
import { Arg, Mutation, Query } from "type-graphql";
import { AnimeInput } from "@root/inputs/Anime/AnimeInput";
import { AnimeData } from "@root/data/anime/AnimeData";
import { Pageable } from "@root/data/pageable/Pageable";
import { AnimePagination } from "@root/data/pageable/AnimePagination";
import { IPaginatedResponse } from "@root/data/pageable/PaginatedResponse";

@ResolverService(Anime)
export class AnimeResolve {
    @Inject(AnimeService)
    private animeService: AnimeService

    createAnime(@Arg("data") animeInput: AnimeInput) {
        let anime = new Anime();
        anime.loadFromInput(animeInput);

        return this.animeService.create(anime);
    }

    @Query((returns) => AnimeData)
    async viewAnime(@Arg("id") id: number) {
        const anime = await this.animeService.findById(id);
        
        return anime;
    }

    @Query((returns) => AnimePagination)
    async animes(@Arg("data") pageable: Pageable): Promise<IPaginatedResponse> {
        const anime = await this.animeService.index(pageable);

        return anime
    }
}