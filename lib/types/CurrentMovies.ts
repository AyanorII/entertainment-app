import BaseMediaData from "./BaseMediaData";

export default interface CurrentMovies extends BaseMediaData {
  adult: boolean;
  original_title: string;
  original_language: string;
  title: string;
  video: boolean;
  release_date: string;
}
