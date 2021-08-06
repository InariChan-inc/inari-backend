import {Inject, Service} from "@tsed/common";
import {UseConnection} from "@tsed/typeorm";
import {AnimeRepository} from "@root/repositories/AnimeRepository";
import {Anime} from "@root/entity/Anime/Anime";
import {AnimeData} from "@root/data/anime/AnimeData";
import {NotFound} from "@tsed/exceptions";
import {Pageable} from "@root/data/pageable/Pageable";
import {AnimePagination} from "@root/data/pageable/AnimePagination";
@Service()
export class AnimeService {
  @Inject()
  @UseConnection("default")
  animeRepository: AnimeRepository;

  async create(anime: Anime) {
    return this.animeRepository.save(anime);
  }

  async findById(id: number): Promise<AnimeData> {
    const anime = await this.animeRepository.findOne(id);

    if (anime === undefined) {
      throw new NotFound("anime not found");
    }

    return AnimeData.loadFromEntity(anime);
  }

  async index(pageable: Pageable): Promise<AnimePagination> {
    const animes = await this.animeRepository.find({
      skip: pageable.page * pageable.size,
      take: pageable.size
    });

    const animesData: AnimeData[] = [];

    for (const [key, anime] of Object.entries(animes)) {
      animesData.push(AnimeData.loadFromEntity(anime));
    }

    return new AnimePagination({data: animesData, total: await this.animeRepository.count(), pageable});
  }
}
