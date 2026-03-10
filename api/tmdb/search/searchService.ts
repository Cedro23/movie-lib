import { TmdbApiService } from "../tmdbApiService";
import { Movie, TV } from "../types";
import {
  SearchMovieRequest,
  SearchResponse,
  SearchTVRequest,
} from "./searchTypes";

export class SearchService extends TmdbApiService {
  static async searchMovie(
    params: SearchMovieRequest,
  ): Promise<SearchResponse<Movie>> {
    return this.get<SearchResponse<Movie>>("/search/movie", params);
  }

  static async searchTV(params: SearchTVRequest): Promise<SearchResponse<TV>> {
    return this.get<SearchResponse<TV>>("/search/tv", params);
  }
}
