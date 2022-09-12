import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"
import { useLazyGetFeedPostsQuery } from "../store/apis/postApi";
import { useAppDispatch, useFeedPostsParams } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice"
import { useFeedPosts } from "../store/slices/postSlice";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import { useWait } from "../components/Util/Spinner";

function Home() {
  const [getFeedPosts] = useLazyGetFeedPostsQuery();
  const posts = useFeedPosts();

  const dispatch = useAppDispatch();
  const location = useLocation();

  const getParams = useFeedPostsParams();

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
        onInit={useWait(() => getFeedPosts({ ...getParams("newer", true) }).unwrap())}
        onTop={useWait(() => getFeedPosts({ ...getParams("newer") }).unwrap())}
        onBottom={useWait(() => getFeedPosts({ ...getParams("older") }).unwrap())}
      >
        <div>{posts.map((post) => <Post post={post} key={post.id} />)}</div>
      </InfiniteScroll>
    </>
  )
}

export default Home