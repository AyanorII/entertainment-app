import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Details from "../../components/Details/Details";
import useBookmarks from "../../lib/hooks/useBookmarks";
import CurrentSeries from "../../lib/types/CurrentSeries";
import TvShowDetails from "../../lib/types/TvShowDetails";

type Props = {
  tvShow: TvShowDetails;
  similarShows: CurrentSeries[];
};

export async function getStaticPaths() {
  const url = "https://api.themoviedb.org/3/tv/on_the_air";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data.results as CurrentSeries[];

  const paths = data.map((show) => {
    return { params: { id: show.id.toString() } };
  });

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = `https://api.themoviedb.org/3/tv/${context!.params!.id}`;
  const similarTvShowsUrl = `https://api.themoviedb.org/3/tv/${
    context!.params!.id
  }/similar`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data as TvShowDetails;

  const similarTvShows = await axios(similarTvShowsUrl, { headers });
  const similarTvShowsData = similarTvShows.data.results as CurrentSeries[];

  return {
    props: {
      tvShow: data,
      similarShows: similarTvShowsData,
    },
  };
};

const TvShow: NextPage<Props> = ({ tvShow, similarShows }) => {
  const { bookmarks } = useBookmarks();

  const isBookmarked = Boolean(bookmarks.find((bookmark) => bookmark.id === tvShow.id));

  return (
    <Details
      tvShow={tvShow}
      similarTvShows={similarShows}
      isBookmarked={isBookmarked}
    />
  );
};

export default TvShow;
