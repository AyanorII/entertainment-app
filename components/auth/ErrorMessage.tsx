import { Typography } from "@mui/material";

type Props = {
  children: string;
};

const ErrorMessage = ({ children }: Props) => {
  return (
    <Typography variant="body2" component="span" color="primary.main">
      {children}
    </Typography>
  );
};

export default ErrorMessage;
