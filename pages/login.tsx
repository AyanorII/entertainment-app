import { Container, Stack } from "@mui/material";
import Image from "next/image";
import AuthForm from "../components/auth/AuthForm";
import { auth } from "../lib/firebase";

type Props = {};

const login = (props: Props) => {

  return (
    <Container>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={5}
        sx={stackStyles}
      >
        <Image src="/assets/logo.svg" width="32" height="25" alt="logo" />
        <AuthForm />
      </Stack>
    </Container>
  );
};

export default login;

const stackStyles = {
  minHeight: "100vh",
};
