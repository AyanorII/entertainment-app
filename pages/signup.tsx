import { Container, Stack } from "@mui/material";
import Image from "next/image";
import AuthForm from "../components/auth/AuthForm";

type Props = {};

const signup = (props: Props) => {
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

export default signup;

const stackStyles = {
  minHeight: "100vh",
};
