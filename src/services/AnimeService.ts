import {Inject, Service} from "@tsed/common";
import {UseConnection} from "@tsed/typeorm";
import {AnimeRepository} from "@root/repositories/AnimeRepository";
import {Anime} from "@root/entity/Anime/Anime";
import {AnimeData} from "@root/data/anime/AnimeData";
import {NotFound} from "@tsed/exceptions";
import {Pageable} from "@root/data/pageable/Pageable";
import {AnimePagination} from "@root/data/pageable/AnimePagination";
import {AnimeInput} from "@root/inputs/Anime/AnimeInput";
import {plainToClass} from "class-transformer";
import {ImageRepository} from "@root/repositories/ImageRepository";
@Service()
export class AnimeService {
  @Inject()
  animeRepository: AnimeRepository;

  @Inject()
  imageRepository: ImageRepository;

  async create(animeInput: AnimeInput) {
    const image = await this.imageRepository.findOne({id: animeInput.imageId});
    const anime = plainToClass(Anime, {...animeInput, name: animeInput.name.ua, name_other: animeInput.name, poster: image});

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
      relations: ["poster"],
      skip: pageable.page * pageable.size,
      take: pageable.size
    });

    const animesData: AnimeData[] = [];

    for (const [key, anime] of Object.entries(animes)) {
      animesData.push(AnimeData.loadFromEntity(anime));
    }

    return new AnimePagination({data: animesData, total: await this.animeRepository.count(), pageable});
  }

  async lastUpdatedAnime(): Promise<AnimeData[]> {
    const animes = await this.animeRepository.find({
      relations: ["poster"],
      order: {update_at: "DESC"},
      take: 10
    });

    return animes.map((anime) => plainToClass(AnimeData, anime));
  }

  async lastAddedAnime(): Promise<AnimeData[]> {
    const animes = await this.animeRepository.find({
      relations: ["poster"],
      order: {created_at: "DESC"},
      take: 10
    });

    return animes.map((anime) => plainToClass(AnimeData, anime));
  }
}
