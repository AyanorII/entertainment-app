import BaseMediaData from "./BaseMediaData";

export default interface CurrentSeries extends BaseMediaData {
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  name: string;
  original_name: string;
}
