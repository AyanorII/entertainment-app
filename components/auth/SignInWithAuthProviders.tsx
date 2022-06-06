import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Fab, Stack, Typography } from "@mui/material";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

type Props = {};

const SignInWithAuthProviders = (props: Props) => {
  const auth = getAuth();

  const providers = [
    {
      name: "Google",
      icon: <GoogleIcon />,
      provider: new GoogleAuthProvider(),
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      provider: new FacebookAuthProvider(),
    },
    {
      name: "GitHub",
      icon: <GitHubIcon />,
      provider: new GithubAuthProvider(),
    },
  ];

  return (
    <div>
      <Typography
        variant="body2"
        component="p"
        color="text.secondary"
        textAlign="center"
        letterSpacing="0.5px"
        mt={3}
      >
        Or continue with a social profile
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        my={2}
      >
        {providers.map(({ icon, provider, name }) => (
          <Fab
            key={name}
            onClick={() => signInWithPopup(auth, provider)}
            size="small"
            color="secondary"
          >
            {icon}
          </Fab>
        ))}
      </Stack>
    </div>
  );
};

export default SignInWithAuthProviders;
