import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment, useMediaQuery } from "@mui/material";
import Input from "@mui/material/Input";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

type Props = {
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ searchTerm, handleSearch }: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const router = useRouter();
  const pathname = router.asPath;

  let placeholder;

  switch (pathname) {
    case "/movies":
      placeholder = "Search for a movie";
      break;
    case "/tv":
      placeholder = "Search for a TV show";
      break;
    default:
      placeholder = "Search for a movie or TV Series";
      break;
  }

  return (
    <Container maxWidth={false}>
      <Input
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        sx={{
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
