import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Stack, Typography } from "@mui/material";

type Props = {
  releaseDate: string;
  title: string;
  rating: number;
  positionAbsolute: boolean;
};

const CardContent = ({
  releaseDate,
  title,
  rating,
  positionAbsolute,
}: Props) => {
  return (
    <Stack
      sx={{
        position: positionAbsolute ? "absolute" : "static",
        bottom: "0",
        zIndex: 1,
        padding: "10px",
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
          { releaseDate.split("-")[0] }
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
          {rating} <StarOutlinedIcon fontSize="inherit" sx={{position: "relative", top: "2px"}}/>
        </Typography>
        {/* -------------------------- Rating ---------------------------- */}
      </Stack>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ backgroundColor: "transparent", textShadow: "0 0 5px 5px #000" }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default CardContent;
