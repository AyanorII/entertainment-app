import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box, Fab, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import CardContent from "./CardContent";

type Props = {
  image: string;
  title: string;
  rating: number;
  releaseDate: string;
  isBookmarked: boolean;
  big?: boolean;
  id: number;
  mediaType: "tv" | "movie";
};

const Card = ({
  image,
  title,
  rating,
  releaseDate,
  isBookmarked,
  big,
  id,
  mediaType,
}: Props) => {
  const PaperStyles = {
    position: "relative",
    minHeight: { xs: "140px", sm: "230px" },
    overflow: "hidden",
    backgroundColor: "transparent",
    minWidth: { xs: big ? "240px" : "100%", sm: big ? "470px" : "100%" },
  };

  return (
    <Link
      href={`/${mediaType === "tv" ? "tv-series" : "movies"}/${id}`}
    >
      <Box
        position="relative"
        marginBottom={{ xs: 2, md: 0 }}
        sx={ {
          cursor: "pointer",
          "&:hover .overlay": {
            opacity: 0,
          },
          "& .card-image": {
            transition: "all 0.3s ease-in-out",
          },
          "&:hover .card-image": {
            transform: "scale(1.05)",
          },
        }}
      >
        <>
          <Paper elevation={15} sx={PaperStyles}>
            <Image
              src={"https://image.tmdb.org/t/p/original" + image}
              layout="fill"
              objectFit="cover"
              alt={title}
              className="card-image"
            />
            <Fab sx={FabStyles}>
              {isBookmarked ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderIcon sx={{ fontSize: "20px" }} />
              )}
            </Fab>
            <Overlay className="overlay" />
          </Paper>
          <CardContent
            title={title}
            rating={rating}
            releaseDate={releaseDate}
            big={big || false}
          />
        </>
      </Box>
    </Link>
  );
};

export default Card;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: #000000;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
`;

const FabStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#00000075",
  color: "#FFF",
  width: "35px",
  height: "35px",
};
