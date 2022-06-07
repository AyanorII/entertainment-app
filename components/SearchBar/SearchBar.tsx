import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment, useMediaQuery } from "@mui/material";
import Input from "@mui/material/Input";

type Props = {};

const SearchBar = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Container maxWidth={false}>
      <Input
        placeholder="Search for movies or TV series"
        sx={ {
          minWidth: isMobile ? "100%" : "400px",
          "&.MuiInputBase-root::after": {
            borderBottomColor: "#fff",
          },
        }}
        inputProps={{
          sx: {
            "&::placeholder": {
              color: "text.primary",
              fontSize: "1rem",
              letterSpacing: "0.25px",
              fontWeight: "light",
            },
          },
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "white" }} />
          </InputAdornment>
        }
      />
    </Container>
  );
};

export default SearchBar;
