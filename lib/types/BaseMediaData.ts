export default interface BaseMediaData {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  vote_count: number;
  genre_ids: number[];
}
