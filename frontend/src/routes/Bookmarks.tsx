import { useEffect } from "react";
import Post from "../components/Post";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { usePostStore } from "../store/postStore";

function Bookmarks() {
  const fetchBookmarkedPosts = usePostStore(state => state.fetchBookmarkedPosts);
  const posts = usePostStore(state => state.getBookmarkedPosts());

  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "bookmarks",
      showBackButton: true
    })
  }, [])

  return (
    <>
      <InfiniteScroll
        onInit={useWait(() => fetchBookmarkedPosts("newer", true))}
        onTop={useWait(() => fetchBookmarkedPosts("newer"))}
        onBottom={useWait(() => fetchBookmarkedPosts("older"))}
      >
        {posts.map((post) => <Post post={post} key={post.id} />)}
      </InfiniteScroll>
    </>
  )
}

export default Bookmarks