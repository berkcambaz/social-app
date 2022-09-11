import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"
import { useLazyGetFeedPostsQuery } from "../store/apis/postApi";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice"
import { useFeedPosts } from "../store/slices/postSlice";
import InfiniteScroll from "../components/InfiniteScroll";

function Home() {
  const [getFeedPosts] = useLazyGetFeedPostsQuery();
  const posts = useFeedPosts();

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "home",
      path: location.pathname,
    }))
  }, [])

  return (
    <>
      <CreatePost />
      <InfiniteScroll
        onInit={() => getFeedPosts({ type: "newer", refresh: true }).unwrap()}
        onTop={() => getFeedPosts({ type: "newer" }).unwrap()}
        onBottom={() => getFeedPosts({ type: "older" }).unwrap()}
      >
        <div>{posts.map((post) => <Post post={post} key={post.id} />)}</div>
      </InfiniteScroll>
    </>
  )
}

export default Home