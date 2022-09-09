import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"
import { useGetFeedPostsQuery } from "../store/apis/postApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice"
import { allFeedPosts } from "../store/slices/postSlice";

function Home() {
  const { } = useGetFeedPostsQuery({ anchor: -1, type: "newer" });
  const posts = useAppSelector(allFeedPosts);

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
      {posts.map((post) => <Post post={post} key={post.id} />)}
    </>
  )
}

export default Home