import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  palette: {
    primary: {
      main: "#FC4747",
    },
    secondary: {
      main: "#161D2F",
      light: "#5A698F",
      dark: "#10141E",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#ffffff75",
    },
  },
});

export default theme
