import { Container, Stack } from "@mui/material";
import AuthForm from "../components/auth/AuthForm";
import Logo from "../components/Logo/Logo";

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
        <Logo />
        <AuthForm />
      </Stack>
    </Container>
  );
};

export default login;

const stackStyles = {
  minHeight: "100vh",
};
