import { useMediaQuery } from "@mui/material";
import Image from "next/image";

type Props = {};

const Logo = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const width = isMobile ? "25px" : "32px";
  const height = isMobile ? "20px" : "26px";

  return (
    <Image src="/assets/logo.svg" width={width} height={height} alt="logo" />
  );
};

export default Logo;
