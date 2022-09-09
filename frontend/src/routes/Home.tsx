import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { IPost } from "../../../shared/types";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"
import { useGetFeedPostsQuery } from "../store/apis/postApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice"
import { selectAllPosts } from "../store/slices/postSlice";

function Home() {
  const { } = useGetFeedPostsQuery({ anchor: -1, type: "newer" });

  const allPosts = useAppSelector(selectAllPosts);
  const posts = useMemo(() => {
    const out: IPost[] = [];
    for (let i = 0; i < allPosts.length; ++i)
      if (allPosts[i].isFeedPost) 
        out.push(allPosts[i]);
    return out;
  }, [allPosts])

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