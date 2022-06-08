import StarIcon from "@mui/icons-material/Star";
import { Stack, Typography } from "@mui/material";

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
        <Typography variant="h3" component="h1" color="text.primary">
          {title}
        </Typography>
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
      </Stack>{" "}
      <Typography
        variant="body1"
        component="p"
        color="text.primary"
        marginBottom={4}
        letterSpacing="0.75px"
        fontWeight="light"
        lineHeight="25px"
      >
        {tagline}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="text.primary"
        letterSpacing="0.65px"
        lineHeight="28px"
        fontWeight="light"
      >
        {overview}
      </Typography>
    </>
  );
};

export default Overview;
