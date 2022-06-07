import { SxProps, Typography } from "@mui/material";

type Props = {
  children: string;
  subHeading?: boolean;
  sx?: SxProps;
};

const Heading = ({ children, subHeading, sx }: Props) => {
  return (
    <Typography
      variant="h5"
      component={subHeading ? "h2" : "h1"}
      color="text.primary"
      fontWeight="light"
      sx={sx}
    >
      {children}
    </Typography>
  );
};

export default Heading;
