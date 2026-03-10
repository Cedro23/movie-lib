export interface SearchResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SearchRequest {
  query: string;
  include_adult?: boolean;
  language?: string;
  page?: number;
  year?: string;
}

export interface SearchMovieRequest extends SearchRequest {
  primary_release_year?: string;
  region?: string;
}

export interface SearchTVRequest extends SearchRequest {
  first_air_date_year?: string;
}
