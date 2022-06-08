export default interface UserBookmark {
  id: string;
  bookmarks: {
    id: number;
    media: "movie" | "tv";
  }[] | null;
}
