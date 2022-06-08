import { Typography } from "@mui/material";

type Props = {
  children: string;
};

const ErrorMessage = ({ children }: Props) => {
  return (
    <Typography variant="body2" component="span" color="primary.main" letterSpacing="0.25px" lineHeight={1.75}>
      {children.replace(/firebase:/i, "").split("(auth")[0]}
    </Typography>
  );
};

export default ErrorMessage;
