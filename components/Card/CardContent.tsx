import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import TvIcon from "@mui/icons-material/Tv";
import { Stack, Typography } from "@mui/material";

type Props = {
  releaseDate: string;
  title: string;
  rating: number;
  big: boolean;
  mediaType: "movie" | "tv";
};

const CardContent = ({ releaseDate, title, rating, big, mediaType }: Props) => {
  return (
    <Stack
      sx={{
        position: big ? "absolute" : "static",
        bottom: "0",
        zIndex: 1,
        padding: big ? "10px" : "1rem 0 0",
      }}
    >
      <Stack flexDirection="row" alignItems="center" gap={3}>
        {/* ----------------------- Release year ------------------------- */}
        <Typography
          variant="body2"
          component="body"
          color="#FFFFFF"
          fontWeight="light"
          sx={{
            backgroundColor: "transparent",
            textShadow: "0 0 5px 5px #000",
          }}
        >
          {releaseDate.split("-")[0]}
        </Typography>
        {/* ----------------------- Release year ------------------------- */}
        {/* -------------------------- Rating ---------------------------- */}
        <Typography
          variant="body2"
          component="body"
          color="#FFFFFF"
          fontWeight="light"
          sx={{
            backgroundColor: "transparent",
            textShadow: "0 0 5px 5px #000",
          }}
        >
          {rating.toFixed(1)}{" "}
          <StarOutlinedIcon
            fontSize="inherit"
            sx={{ position: "relative", top: "2px" }}
          />
        </Typography>
        {/* -------------------------- Rating ------------------------------ */}
        {/* --------------------------- Type --------------------------------*/}
        <Typography
          variant="body2"
          component="body"
          color="#FFFFFF"
          fontWeight="light"
          sx={{
            backgroundColor: "transparent",
            textShadow: "0 0 5px 5px #000",
            position: "relative",
            bottom: "2px"
          }}
        >
          {mediaType === "movie" ? (
            <LocalMoviesIcon
              sx={{
                fontSize: "18px",
                position: "relative",
                top: "4px",
                marginRight: "6px",
              }}
            />
          ) : (
            <TvIcon
              sx={{
                fontSize: "18px",
                position: "relative",
                top: "4px",
                marginRight: "6px",
              }}
            />
          )}
          {mediaType === "movie" ? "Movie" : "TV Show"}
        </Typography>
        {/* --------------------------- Type --------------------------------*/}
      </Stack>
      {/* --------------------------- Title ------------------------------ */}
      <Typography
        variant="body1"
        color="text.primary"
        letterSpacing={0.75}
        sx={{ backgroundColor: "transparent", textShadow: "0 0 5px 5px #000" }}
      >
        {title}
      </Typography>
      {/* --------------------------- Title ------------------------------ */}
    </Stack>
  );
};

export default CardContent;
