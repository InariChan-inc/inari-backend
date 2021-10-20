import {Inject, Service} from "@tsed/di";
import {Genre} from "../entity/Genre/Genre";
import {GenreRepository} from "../repositories/GenreRepository";

@Service()
export class GenreService {
  @Inject()
  genreRepository: GenreRepository;

  async createIfNewElseReturn(name: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({name});
    if (genre) {
      return genre;
    }
    return this.genreRepository.save({name});
  }
}
