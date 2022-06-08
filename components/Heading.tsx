import { SxProps, Typography } from "@mui/material";

type Props = {
  children: string;
  subHeading?: boolean;
  sx?: SxProps;
};

const Heading = ({ children, subHeading, sx }: Props) => {
  return (
    <Typography
      variant="h4"
      component={subHeading ? "h2" : "h1"}
      color="text.primary"
      fontWeight="light"
      sx={ sx }
      marginBottom={ subHeading ? 2 : 4 }
    >
      {children}
    </Typography>
  );
};

export default Heading;
