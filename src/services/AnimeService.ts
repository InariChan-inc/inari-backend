import {Inject, Service} from "@tsed/common";
import {AnimeRepository} from "@root/repositories/AnimeRepository";
import {Anime} from "@root/entity/Anime/Anime";
import {AnimeData} from "@root/data/anime/AnimeData";
import {NotFound} from "@tsed/exceptions";
import {AnimePagination} from "@root/data/pageable/AnimePagination";
import {AnimeInput} from "@root/inputs/Anime/AnimeInput";
import {plainToClass} from "class-transformer";
import {ImageRepository} from "@root/repositories/ImageRepository";
import {AgendaService} from "@tsed/agenda";
import {ViewsInformation} from "../entity/Anime/ViewsInformation";
import {GenreService} from "./GenreService";
import {FigureService} from "./FigureService";
import {AnimePegeable} from "../data/anime/AnimePageable";
import {AnimeFilterEnum} from "../enum/anime/AnimeFIlterEnum";
import {FilterAbstract} from "./animes/filter/FilterAbstract";
import {GenreFilter} from "./animes/filter/GenreFilter";
import {SeasonFilter} from "./animes/filter/SeasonFilter";

@Service()
export class AnimeService {
  @Inject()
  animeRepository: AnimeRepository;

  @Inject()
  imageRepository: ImageRepository;

  @Inject()
  genreService: GenreService;

  @Inject()
  figureService: FigureService;

  @Inject()
  private agenda: AgendaService;

  async create(animeInput: AnimeInput): Promise<Anime> {
    const image = await this.imageRepository.findOne({id: animeInput.imageId});
    const genres = await Promise.all(animeInput.genres.map(async (genre) => this.genreService.createIfNewElseReturn(genre)));
    await Promise.all(animeInput.figures.map(async (figure) => this.figureService.createIfNewElseReturn(figure)));
    //_.unset(animeInput, "figures");

    const anime = plainToClass(Anime, {...animeInput, name: animeInput.name.ua, nameOther: animeInput.name, poster: image});

    anime.genres = genres;

    return this.animeRepository.save(anime);
  }

  async findById(id: number): Promise<AnimeData> {
    const anime = await this.animeRepository
      .createQueryBuilder("Anime")
      .leftJoinAndSelect("Anime.genres", "genres")
      .leftJoinAndSelect("Anime.poster", "P", "P.id = Anime.posterId")
      .leftJoinAndMapOne("Anime.viewMonth", ViewsInformation, "V_I", "V_I.animeId = Anime.id")
      .where("Anime.id = :id", {id})
      .getOne();

    if (anime === undefined) {
      throw new NotFound("anime not found");
    }

    return AnimeData.loadFromEntity(anime);
  }

  async findBySearch(search: string): Promise<AnimeData[]> {
    const animes = await this.animeRepository
      .createQueryBuilder("Anime")
      .leftJoinAndSelect("Anime.poster", "P", "P.id = Anime.posterId")
      .leftJoinAndMapOne("Anime.viewMonth", ViewsInformation, "V_I", "V_I.animeId = Anime.id")
      .where("Anime.name like :name", {name: `%${search}%`})
      .orderBy("views", "DESC")
      .limit(12)
      .getMany();

    return animes.map((anime) => AnimeData.loadFromEntity(anime));
  }

  async view(id: number, ip: string): Promise<AnimeData> {
    const animeData = await this.findById(id);
    await this.agenda.now("view.addView", {animeId: id, ip});
    return animeData;
  }

  async index(pageable: AnimePegeable): Promise<AnimePagination> {
    const animesQuery = await this.animeRepository
      .createQueryBuilder("anime")
      .leftJoinAndSelect("anime.poster", "poster")
      .leftJoinAndSelect("anime.genres", "genres")
      .offset(pageable.page * pageable.size)
      .limit(pageable.size);

    const animes = await this.filterObject(pageable.filter.type)?.filter(pageable.filter.params, animesQuery).getMany();

    if (!animes) {
      throw new NotFound("animes not found");
    }

    const animesData: AnimeData[] = [];

    for (const anime of animes) {
      animesData.push(AnimeData.loadFromEntity(anime));
    }

    return new AnimePagination({data: animesData, total: await this.animeRepository.count(), pageable});
  }

  filterObject(type: string): FilterAbstract | undefined {
    if (AnimeFilterEnum.GENRE === type) {
      return new GenreFilter();
    } else if (AnimeFilterEnum.SEASON === type) {
      return new SeasonFilter();
    } else if (AnimeFilterEnum.YEARS === type) {
      return new SeasonFilter();
    }
  }

  async topAnimeMonth(): Promise<AnimeData[]> {
    const date = new Date();

    const animes = await this.animeRepository
      .createQueryBuilder("Anime")
      .leftJoinAndSelect("Anime.poster", "P", "P.id = Anime.posterId")
      .leftJoinAndMapOne("Anime.viewMonth", ViewsInformation, "V_I", "V_I.animeId = Anime.id")
      .where("V_I.dateMonth = :dateMonth", {
        dateMonth: date.getFullYear() + "-" + date.getMonth()
      })
      .orderBy("views", "DESC")
      .limit(12)
      .getMany();

    return animes.map((anime) => AnimeData.loadFromEntity(anime));
  }

  async lastUpdatedAnime(): Promise<AnimeData[]> {
    const animes = await this.animeRepository.find({
      relations: ["poster"],
      order: {updateAt: "DESC"},
      take: 12
    });

    return animes.map((anime) => AnimeData.loadFromEntity(anime));
  }

  async lastAddedAnime(): Promise<AnimeData[]> {
    const animes = await this.animeRepository.find({
      relations: ["poster"],
      order: {createdAt: "DESC"},
      take: 12
    });

    return animes.map((anime) => AnimeData.loadFromEntity(anime));
  }
}
