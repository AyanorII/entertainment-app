import { Grid, Skeleton, Stack, Typography } from "@mui/material";

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

const InfoText = ({ children }: Children) => {
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
  runtime?: number;
  budget?: number;
  revenue?: number;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  status?: string;
  productionCountries: { iso_3166_1: string; name: string }[];
};

const Info = ({
  genres,
  releaseDate,
  runtime,
  budget,
  revenue,
  productionCountries,
  numberOfEpisodes,
  numberOfSeasons,
  status,
}: Props) => {
  const formattedDate = new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getFormattedCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Grid container rowGap={5} columnGap={3}>
      {/* ---------------------------- Genres ------------------------------ */}
      {genres && (
        <Grid item xs={12} md={5} alignItems={{ md: "center" }}>
          <SubHeading>Genres</SubHeading>
          <Stack flexDirection="row" flexWrap="wrap" columnGap={4} rowGap={1}>
            {genres.map((genre) => {
              return <InfoText key={genre.id}>{genre.name}</InfoText>;
            })}
          </Stack>
        </Grid>
      ) }
      {/* ---------------------------- Genres ------------------------------ */}
      {/* ------------------------- Release Date --------------------------- */}
      <Grid item xs={12} md={5}>
        <SubHeading>Release Date</SubHeading>
        <InfoText>{formattedDate}</InfoText>
      </Grid>
      {/* ------------------------- Release Date --------------------------- */}
      {/* --------------------------- Runtime ------------------------------ */}
      {runtime && (
        <Grid item xs={12} md={5}>
          <SubHeading>Runtime</SubHeading>
          <InfoText>{`${runtime} minutes`}</InfoText>
        </Grid>
      )}
      {/* --------------------------- Runtime ------------------------------ */}
      {/* --------------------------- Budget ------------------------------- */}
      {budget && (
        <Grid item xs={12} md={5}>
          <SubHeading>Budget</SubHeading>
          <InfoText>{getFormattedCurrency(budget)}</InfoText>
        </Grid>
      )}
      {/* --------------------------- Budget ------------------------------- */}
      {/* -------------------------- Revenue ------------------------------- */}
      {revenue && (
        <Grid item xs={12} md={5}>
          <SubHeading>Revenue</SubHeading>
          <InfoText>{getFormattedCurrency(revenue)}</InfoText>
        </Grid>
      )}
      {/* -------------------------- Revenue ------------------------------- */}
      {/* --------------------- Number of Episodes ------------------------- */}
      {numberOfEpisodes && (
        <Grid item xs={12} md={5}>
          <SubHeading>Episodes</SubHeading>
          <InfoText>{`${numberOfEpisodes} episodes`}</InfoText>
        </Grid>
      )}
      {/* --------------------- Number of Episodes ------------------------- */}
      {/* ---------------------- Number of Seasons ------------------------- */}
      {numberOfSeasons && (
        <Grid item xs={12} md={5}>
          <SubHeading>Seasons</SubHeading>
          <InfoText>{`${numberOfSeasons} seasons`}</InfoText>
        </Grid>
      )}
      {/* ---------------------- Number of Seasons ------------------------- */}
      {/* ------------------------- Show Status ---------------------------- */}
      {status && (
        <Grid item xs={12} md={5}>
          <SubHeading>Show status</SubHeading>
          <InfoText>{status}</InfoText>
        </Grid>
      )}
      {/* ------------------------- Show Status ---------------------------- */}
      {/* -------------------------- Country ------------------------------- */}
      {productionCountries && (
        <Grid item xs={12} md={5}>
          <SubHeading>Production Countries</SubHeading>
          {productionCountries.map((country) => {
            return <InfoText key={country.iso_3166_1}>{country.name}</InfoText>;
          })}
        </Grid>
      )}
      {/* -------------------------- Country ------------------------------- */}
    </Grid>
  );
};

export default Info;
