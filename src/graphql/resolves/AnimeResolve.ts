import { Inject } from "@tsed/di";
import { ResolverService } from "@tsed/graphql";
import { Anime } from "@root/entity/Anime/Anime";
import { AnimeService } from "@root/services/AnimeService";
import { Arg, Mutation } from "type-graphql";
import { AnimeInput } from "@root/inputs/Anime/AnimeInput";

@ResolverService(Anime)
export class AnimeResolve {
    @Inject(AnimeService)
    private userService: AnimeService

    @Mutation(() => Anime)
    createAnime(@Arg("data") animeInput: AnimeInput) {
        let anime = new Anime();
        anime.loadFromInput(animeInput);
        
        return this.userService.create(anime);
    }
}