import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"
import InfiniteScroll from "../components/Util/InfiniteScroll";
import { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { usePostStore } from "../store/postStore";

function Home() {
  const fetchFeedPosts = usePostStore(state => state.fetchFeedPosts);
  const posts = usePostStore(state => state.getFeedPosts());

  const location = useLocation();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "home",
      path: location.pathname,
    })
  }, [])

  return (
    <>
      <CreatePost />
      <InfiniteScroll
        onInit={useWait(() => fetchFeedPosts("newer", true))}
        onTop={useWait(() => fetchFeedPosts("newer"))}
        onBottom={useWait(() => fetchFeedPosts("older"))}
      >
        <div>{posts.map((post) => <Post post={post} key={post.id} />)}</div>
      </InfiniteScroll>
    </>
  )
}

export default Home