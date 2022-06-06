import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const ChangeAuthActionLink = () => {
  const router = useRouter();
  const authAction = router.asPath.includes("login") ? "login" : "signup";

  return authAction === "login" ? (
    <Typography
      variant="body2"
      letterSpacing="0.5px"
      textAlign="center"
      color="text.secondary"
      fontWeight="light"
    >
      Don&apos;t have an account yet?{" "}
      <Link href="/signup" passHref>
        <StyledLink>Register</StyledLink>
      </Link>
    </Typography>
  ) : (
    <Typography
      variant="body2"
      letterSpacing="0.5px"
      textAlign="center"
      color="text.secondary"
    >
      Already a member?{" "}
      <Link href="/login" passHref>
        <StyledLink>Login</StyledLink>
      </Link>
    </Typography>
  );
};

export default ChangeAuthActionLink;

const StyledLink = styled.a`
  color: #04bbf6 !important;

  &::visited {
    color: #04bbf6 !important;
  }
`;
