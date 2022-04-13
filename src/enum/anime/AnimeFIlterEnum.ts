export enum AnimeFilterEnum {
  GENRE = "GENRE",
  EXCLUDE_GENRE = "EXCLUDEGENRE",
  TYPE_ANIME = "TYPE_ANIME",
  STATUS_ANIME = "STATUS_ANIME",
  SEASON = "SEASON",
  YEARS = "YEARS",
  SEARCH = "SEARCH"
}

export interface IAnimeFilterEnum {
  genreParams: string;
  excludeGenreParams: string;
  searchParams: string;
  seasonParams: string;
}
