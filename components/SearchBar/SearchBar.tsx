import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment } from "@mui/material";
import Input from "@mui/material/Input";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <Container>
      <Input
        placeholder="Search for movies or TV series"
        fullWidth
        sx={{
          "&.MuiInputBase-root::after": {
            borderBottomColor: "#fff",
          },
        }}
        inputProps={{
          sx: {
            "&::placeholder": {
              color: "text.secondary",
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
