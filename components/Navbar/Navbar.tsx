import { Avatar, Box, Container, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Logo from "../Logo/Logo";
import NavLink from "./NavLink";

type Props = {};

const Navbar = (props: Props) => {
  const [user, loading, error] = useAuthState(auth as any);

  const links = [
    {
      href: "/",
      iconSrc: "/assets/icon-nav-home.svg",
    },
    {
      href: "/movies",
      iconSrc: "/assets/icon-nav-movies.svg",
    },
    {
      href: "/tv-series",
      iconSrc: "/assets/icon-nav-tv-series.svg",
    },
    {
      href: "/bookmarks",
      iconSrc: "/assets/icon-nav-bookmark.svg",
    },
  ];

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Container disableGutters={isMobile}>
      <Box
        bgcolor="secondary.main"
        mt={{ sm: 2 }}
        sx={{ borderRadius: !isMobile ? "10px" : 0 }}
      >
        <Stack
          flexDirection={{ xs: "row", lg: "column" }}
          justifyContent="space-between"
          alignItems="center"
          minHeight={{ xs: "auto", lg: "80vh" }}
          p={{ xs: 2, sm: 3 }}
        >
          {/* -------------------------- Logo ------------------------------ */}
          <Logo />
          {/* -------------------------- Logo ------------------------------ */}
          {/* ------------------------- Links ------------------------------ */}
          <Stack
            flexDirection={{ xs: "row", lg: "column" }}
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            {links.map(({ href, iconSrc }) => (
              <NavLink key={href} href={href} iconSrc={iconSrc} />
            ))}
          </Stack>
          {/* ------------------------- Links ------------------------------ */}
          {/* ---------------------- User Avatar --------------------------- */}
          <Avatar
            src={user!.photoURL!}
            alt={user!.displayName!}
            variant="circular"
            sx={{
              width: isMobile ? "24px" : "40px",
              height: isMobile ? "24px" : "40px",
              border: "1px solid #FFFFFF85",
            }}
          />
        </Stack>
        {/* ---------------------- User Avatar --------------------------- */}
      </Box>
    </Container>
  );
};

export default Navbar;
