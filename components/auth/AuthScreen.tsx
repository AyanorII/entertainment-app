import { Container, Stack } from '@mui/material';
import React from 'react'
import Logo from '../Logo/Logo';
import AuthForm from './AuthForm';

type Props = {}

const AuthScreen = (props: Props) => {
  return (
    <Container>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={5}
        sx={{minHeight: "100vh"}}
      >
        <Logo />
        <AuthForm />
      </Stack>
    </Container>
  );
}

export default AuthScreen
