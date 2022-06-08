import { Box, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
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
    // minHeight: { xs: "140px", sm: "230px" },
    overflow: "hidden",
    backgroundColor: "transparent",
    minWidth: { xs: big ? "375px" : "100%", sm: big ? "470px" : "100%", md: big ? "700px" : "100%" },
    minHeight: { xs: big ? "250px" : "140px", sm: big ? "350px" : "250px" },
  };

  return (
    <Box
      position="relative"
      marginBottom={{ xs: 2, md: 0 }}
      sx={{
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
      <BookmarkButton
        isBookmarked={isBookmarked}
        id={id}
        mediaType={mediaType}
      />
      <Link href={`/${mediaType === "movie" ? "movies" : "tv"}/${id}`} passHref>
        <a style={{textDecoration: "none"}}>
          <Paper elevation={15} sx={PaperStyles}>
            <Image
              src={"https://image.tmdb.org/t/p/original" + image}
              layout="fill"
              objectFit="cover"
              alt={title}
              className="card-image"
            />
            <Overlay className="overlay" />
          </Paper>
          <CardContent
            title={title}
            rating={rating}
            releaseDate={releaseDate}
            big={ big || false }
            mediaType={mediaType}
          />
        </a>
      </Link>
    </Box>
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
