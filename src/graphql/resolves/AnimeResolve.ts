import { Inject } from "@tsed/di";
import { ResolverService } from "@tsed/graphql";
import { Anime } from "@root/entity/Anime/Anime";
import { AnimeService } from "@root/services/AnimeService";
import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { AnimeInput } from "@root/inputs/Anime/AnimeInput";
import { TContext } from "@root/interface/Context";
import { NotFound } from "@tsed/exceptions";
import { number } from "@tsed/schema";

@ResolverService(Anime)
export class AnimeResolve {
    @Inject(AnimeService)
    private animeService: AnimeService

    @Mutation(() => Anime)
    createAnime(@Arg("data") animeInput: AnimeInput) {
        let anime = new Anime();
        anime.loadFromInput(animeInput);

        return this.animeService.create(anime);
    }

    @Query((returns) => Anime)
    async userProfile(@Arg("id") id: number) {
        const anime = await this.animeService.findById(id);

        if (anime === undefined) {
            throw new NotFound("anime not found");
        }

        return anime;
    }
}