import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Fab, Paper } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import CardContent from "./CardContent";

type Props = {
  image: string;
  title: string;
  rating: number;
  releaseDate: string;
  id: number;
  isBookmarked: boolean;
};

const Card = ({
  image,
  title,
  rating,
  releaseDate,
  id,
  isBookmarked,
}: Props) => {
  return (
    <Paper
      elevation={15}
      sx={{
        position: "relative",
        minHeight: { xs: "140px", sm: "230px" },
        overflow: "hidden",
        backgroundColor: "transparent",
        minWidth: { xs: "240px", sm: "470px" },
      }}
    >
      <Image
        src={"https://image.tmdb.org/t/p/original" + image}
        layout="fill"
        objectFit="cover"
        alt={title}
      />
      <Fab
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#00000075",
          color: "#FFF",
          width: "35px",
          height: "35px",
        }}
      >
        {isBookmarked ? (
          <BookmarkIcon />
        ) : (
          <BookmarkBorderIcon sx={{ fontSize: "20px" }} />
        )}
      </Fab>
      <CardContent
        title={title}
        rating={rating}
        releaseDate={releaseDate}
        positionAbsolute
      />
      <Overlay />
    </Paper>
  );
};

export default Card;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: #00000070;
`;
