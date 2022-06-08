import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Fab } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../lib/firebase";
import useBookmarks from "../../lib/hooks/useBookmarks";

type Props = {
  isBookmarked: boolean;
  id: number;
  mediaType: "movie" | "tv";
};

const BookmarkButton = ({ isBookmarked, id, mediaType }: Props) => {
  const [user, loading, errors] = useAuthState(auth as any);
  const { bookmarks } = useBookmarks();
  const bookmark = bookmarks.find((bk) => bk.id === id);

  const handleBookmark = async () => {
    if (bookmark) {
      await firestore.doc(`bookmarks/${user?.uid}`).set({
        id: user?.uid,
        bookmarks: [...bookmarks.filter((bk) => bk.id !== id)],
      });
    } else {
      await firestore
        .doc(`bookmarks/${user?.uid}`)
        .set({
          id: user?.uid,
          bookmarks: [...bookmarks, { id, media: mediaType }],
        });
    }
  };

  return (
    <Fab sx={FabStyles} onClick={handleBookmark}>
      {isBookmarked ? (
        <BookmarkIcon />
      ) : (
        <BookmarkBorderIcon sx={{ fontSize: "20px" }} />
      )}
    </Fab>
  );
};

export default BookmarkButton;

const FabStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#00000075",
  color: "#FFF",
  width: "40px",
  height: "40px",
  zIndex: 20,

  "&:hover": {
    backgroundColor: "#000000",
  },
};
