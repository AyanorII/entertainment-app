import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase";
import Bookmark from "../types/Bookmark";

const useBookmarks = () => {
  const [user, userLoading, userError] = useAuthState(auth as any);
  const [snapshot, loading, error] = useCollection(
    collection(firestore, "bookmarks")
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  useEffect(() => {
    if (!user) return;

    const userBookmarkDoc = snapshot?.docs
      .find((doc) => doc.id === user?.uid)
      ?.data();

    const userBookmarks = userBookmarkDoc?.bookmarks as Bookmark[];
    
    setBookmarks(userBookmarks || []);
  }, [snapshot, user]);

  return { bookmarks, loading, error };
};

export default useBookmarks;
