import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "../../lib/firebase";
import ChangeAuthActionLink from "./ChangeAuthActionLink";
import ErrorMessage from "./ErrorMessage";
import SignInWithAuthProviders from "./SignInWithAuthProviders";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) router.push("/");
  }, [auth.currentUser, router.asPath]);

  const authAction = router.asPath.includes("login") ? "login" : "signup";

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    setLoading(true);
    try {
      if (authAction === "login") {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        backgroundColor: "transparent",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box
        bgcolor="secondary.main"
        px={{ xs: 3, sm: 5, md: 7 }}
        py={ { xs: 5, sm: 7, md: 9 } }
        pb={{md: 5}}
        maxWidth="sm"
      >
        {/* --------------------------- Heading --------------------------- */}
        <Typography
          variant="h4"
          color="text.primary"
          textAlign="left"
          fontWeight="light"
          sx={{ marginBottom: "1.5rem" }}
        >
          {authAction === "login" ? "Login" : "Register"}
        </Typography>
        {/* --------------------------- Heading --------------------------- */}
        {/* ---------------------------- Form ----------------------------- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ----------------------- Email field -------------------------- */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Email cannot be blank" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                label="Email address"
                type="email"
                fullWidth
                error={errors.email ? true : false}
                sx={textFieldStyles}
              />
            )}
          />
          {errors.email && <ErrorMessage>{errors.email.message!}</ErrorMessage>}
          {/* ----------------------- Email field -------------------------- */}
          {/* --------------------- Password field ------------------------- */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password cannot be blank" },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                label="Password"
                fullWidth
                type="password"
                error={errors.password ? true : false}
                sx={textFieldStyles}
              />
            )}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message!}</ErrorMessage>
          )}
          {/* --------------------- Password field ------------------------- */}
          {/* ------------------------- Error ------------------------------ */}
          {error && (
            <Box mt={2}>
              <ErrorMessage>{error}</ErrorMessage>
            </Box>
          )}
          {/* ------------------------- Error ------------------------------ */}
          {/* --------------------- Submit button -------------------------- */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            sx={{
              textTransform: "none",
              letterSpacing: "0.5px",
              paddingBlock: "0.75rem",
              marginTop: "2.5rem",
            }}
          >
            <Typography variant="body1">
              {loading ? (
                <ClipLoader />
              ) : authAction === "login" ? (
                "Login to your account"
              ) : (
                "Create new account"
              )}
            </Typography>
          </Button>
          {/* --------------------- Submit button -------------------------- */}
        </form>
        {/* ---------------------------- Form ------------------------------ */}
        {/* -------------------------- Providers --------------------------- */}
        <SignInWithAuthProviders />
        {/* -------------------------- Providers --------------------------- */}
        <ChangeAuthActionLink />
      </Box>
    </Paper>
  );
};

export default AuthForm;

const textFieldStyles = {
  // Input
  "& .MuiFilledInput-input": {
    paddingInline: "0",
  },
  /* -------------------------------- Label --------------------------------- */
  // Label
  "& .MuiInputLabel-root": {
    left: "-12px",
  },
  // Label when focused
  "& .MuiInputLabel-root.Mui-focused": {
    color: "text.primary",
  },
  // Label when error
  "& .MuiInputLabel-root.Mui-focused.Mui-error": {
    color: "primary.main",
  },
  /* -------------------------------- Label --------------------------------- */
  /* ------------------------------- Border --------------------------------- */
  // Border bottom
  "& .MuiFilledInput-root:before": {
    borderBottomColor: "secondary.light",
  },
  // Border bottom when focused
  "& .MuiFilledInput-root:after": {
    borderBottomColor: "text.primary",
  },
  // Border bottom when error
  "& .Mui-error.MuiFilledInput-root:after": {
    borderBottomColor: "primary.main",
  },
  /* ------------------------------- Border --------------------------------- */
  /* ------------------------------- Margin --------------------------------- */
  "&:not(&:first-of-type)": {
    marginTop: "0.5rem",
  },
  marginBottom: "0.25rem",
  /* ------------------------------- Margin --------------------------------- */
};
