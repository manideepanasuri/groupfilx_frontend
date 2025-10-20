export interface SearchJSON {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result {
  id: number;
  tmdb_id: number;
  movieId: number;
  title: string;
  original_title: string;
  overview: string;
  tagline: string;
  status: string;
  release_date: string;
  runtime: number;
  revenue: number;
  budget: number;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  imdb_id: any;
  original_language: string;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  genres: Genre[];
  keywords: Keyword[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
}

export interface ProductionCountry {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  id: number;
  name: string;
}
