export enum AnimeFilterEnum {
  GENRE = "GENRE",
  EXCLUDE_GENRE = "EXCLUDEGENRE",
  TYPE_ANIME = "TYPE",
  STATUS_ANIME = "STATUS_ANIME",
  SEASON = "SEASON",
  YEARS = "YEARS",
  SEARCH = "SEARCH"
}

export interface IAnimeFilterEnum {
  genre: string;
  searchParams: string;
  typeParams: string;
  seasonParams: string;
}
