import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

type Props = {};

const GoBackButton = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{
        backgroundColor: "#5A698F70",
        color: "#FFFFFF80",
        textTransform: "capitalize",
        borderRadius: "6px",
        marginBottom: 5,
        "&:hover": {
          backgroundColor: "#5A698F",
          color: "#FFFFFF",
        },
      }}
    >
      <KeyboardBackspaceIcon sx={{ marginRight: 2 }} /> Go back
    </Button>
  );
};

export default GoBackButton;
