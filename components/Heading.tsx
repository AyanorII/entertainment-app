import { Typography } from "@mui/material";

type Props = {
  children: string;
  subHeading?: boolean;
};

const Heading = ({ children, subHeading }: Props) => {
  return (
    <Typography
      variant="h5"
      component={subHeading ? "h2" : "h1"}
      color="text.primary"
      fontWeight="light"
    >
      {children}
    </Typography>
  );
};

export default Heading;
