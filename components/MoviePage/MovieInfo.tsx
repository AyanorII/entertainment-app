import { Grid, Stack, Typography } from "@mui/material";

type Children = {
  children: string;
};

const SubHeading = ({ children }: Children) => {
  return (
    <Typography
      variant="h5"
      component="h2"
      color="text.primary"
      fontWeight="light"
      marginBottom={2}
    >
      {children}
    </Typography>
  );
};

const Info = ({ children }: Children) => {
  return (
    <Typography
      variant="h6"
      component="p"
      color="text.secondary"
      fontWeight="light"
    >
      {children}
    </Typography>
  );
};

type Props = {
  genres: {
    id: number;
    name: string;
  }[];
  releaseDate: string;
  runtime: number;
  budget: number;
  revenue: number;
  productionCountries: { iso_3166_1: string; name: string }[];
};

const MovieInfo = ({
  genres,
  releaseDate,
  runtime,
  budget,
  revenue,
  productionCountries,
}: Props) => {
  const formattedDate = new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getFormattedCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  return (
    <Grid container rowGap={5} columnGap={3}>
      {/* ---------------------------- Genres ------------------------------ */}
      <Grid item xs={12} md={5} alignItems={{md: "center"}}>
        <SubHeading>Genre</SubHeading>
        <Stack flexDirection="row" flexWrap="wrap" columnGap={4} rowGap={1}>
          {genres.map((genre) => {
            return <Info key={genre.id}>{genre.name}</Info>;
          })}
        </Stack>
      </Grid>
      {/* ---------------------------- Genres ------------------------------ */}
      {/* ------------------------- Release Date --------------------------- */}
      <Grid item xs={12} md={5}>
        <SubHeading>Release Date</SubHeading>
        <Info>{formattedDate}</Info>
      </Grid>
      {/* ------------------------- Release Date --------------------------- */}
      {/* --------------------------- Runtime ------------------------------ */}
      <Grid item xs={12} md={5}>
        <SubHeading>Runtime</SubHeading>
        <Info>{`${runtime} minutes`}</Info>
      </Grid>
      {/* --------------------------- Runtime ------------------------------ */}
      {/* --------------------------- Budget ------------------------------- */}
      <Grid item xs={12} md={5}>
        <SubHeading>Budget</SubHeading>
        <Info>
          {getFormattedCurrency(budget)}
        </Info>
      </Grid>
      {/* --------------------------- Budget ------------------------------- */}
      {/* -------------------------- Revenue ------------------------------- */}
      <Grid item xs={12} md={5}>
        <SubHeading>Revenue</SubHeading>
        <Info>
          {getFormattedCurrency(revenue)}
        </Info>
      </Grid>
      {/* -------------------------- Revenue ------------------------------- */}
      {/* -------------------------- Country ------------------------------- */}
      <Grid item xs={12} md={5}>
        <SubHeading>Production Countries</SubHeading>
        {productionCountries.map((country) => {
          return <Info key={country.iso_3166_1}>{country.name}</Info>;
        })}
      </Grid>
      {/* -------------------------- Country ------------------------------- */}
    </Grid>
  );
};

export default MovieInfo;
