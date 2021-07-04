import { Inject, Service } from "@tsed/common";
import { UseConnection } from "@tsed/typeorm";
import { UserInput } from "../inputs/User/UserInput";
import { AnimeRepository } from "@root/repositories/AnimeRepository";
import { AnimeInput } from "@root/inputs/Anime/AnimeInput";
import { Anime } from "@root/entity/Anime/Anime";
@Service()
export class AnimeService {
  @Inject()
  @UseConnection("default")
  animeRepository: AnimeRepository;

  async create(anime: Anime) {
      return this.animeRepository.save(anime);
  }
}
