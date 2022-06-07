import BaseMediaData from "./BaseMediaData";
import CurrentMovies from "./CurrentMovies";
import CurrentSeries from "./CurrentSeries";

export default interface TrendingData
  extends BaseMediaData,
    CurrentMovies,
    CurrentSeries {}
