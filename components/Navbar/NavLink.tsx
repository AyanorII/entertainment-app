import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  href: string;
  iconSrc: string;
};

const NavLink = ({ href, iconSrc }: Props) => {
  const router = useRouter();
  const pathname = router.asPath;

  const imageStyles = {
    transition: "all 0.35s ease-in-out",
    filter: pathname === href ? "invert(1) brightness(100)" : "unset",
    cursor: "pointer",

    "&:hover *": {
      filter: "invert(1) brightness(100)",
    }
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  const width = isMobile ? "16px" : "20px";
  const height = isMobile ? "16px" : "20px";

  return (
    <Link href={href} style={{ cursor: "pointer" }} passHref>
      <a>
        <Image
          src={iconSrc}
          width={width}
          height={height}
          alt={href}
          style={imageStyles}
        />
      </a>
    </Link>
  );
};

export default NavLink;
