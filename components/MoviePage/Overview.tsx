import StarIcon from "@mui/icons-material/Star";
import { Skeleton, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  rating: number;
  tagline: string;
  overview: string;
};

const Overview = ({ title, rating, tagline, overview }: Props) => {
  return (
    <>
      <Stack flexDirection="row" alignItems="center" gap={2} marginBottom={1}>
        {/* --------------------------- Title ------------------------------ */}
        {title && (
          <Typography variant="h3" component="h1" color="text.primary">
            {title}
          </Typography>
        )}
        {!title && <Skeleton variant="text" />}
        {/* --------------------------- Title ------------------------------ */}
        {/* --------------------------- Rating ----------------------------- */}
        {rating && (
          <Typography
            variant="h5"
            component="span"
            color="text.secondary"
            fontWeight="light"
          >
            <Stack flexDirection="row" gap={1}>
              {rating}{" "}
              <StarIcon
                sx={{
                  color: "#FFE600",
                }}
              />
            </Stack>
          </Typography>
        )}
        {!rating && <Skeleton variant="text" />}
        {/* --------------------------- Rating ----------------------------- */}
      </Stack>{" "}
      {/* ---------------------------- Tagline ----------------------------- */}
      {tagline && <Typography
        variant="body1"
        component="p"
        color="text.primary"
        marginBottom={4}
        letterSpacing="0.75px"
        fontWeight="light"
        lineHeight="25px"
      >
        {tagline}
      </Typography> }
      {!tagline && <Skeleton variant="text" />}
      {/* ---------------------------- Tagline ----------------------------- */}
      {/* --------------------------- Overview ----------------------------- */}
      {overview && <Typography
        variant="body1"
        component="p"
        color="text.primary"
        letterSpacing="0.65px"
        lineHeight="28px"
        fontWeight="light"
      >
        {overview}
      </Typography> }
      {!overview && <Skeleton variant="rectangular" height="400px"/>}
      {/* --------------------------- Overview ----------------------------- */}
    </>
  );
};

export default Overview;
