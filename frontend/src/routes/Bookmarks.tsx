import { useEffect, useMemo } from "react";
import { IPost } from "../../../shared/types";
import Post from "../components/Post";
import { useGetBookmarkedPostsQuery } from "../store/apis/postApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { selectAllPosts } from "../store/slices/postSlice";


function Bookmarks() {
  const { } = useGetBookmarkedPostsQuery({ anchor: -1, type: "newer" });

  const allPosts = useAppSelector(selectAllPosts);
  const posts = useMemo(() => {
    const out: IPost[] = [];
    for (let i = 0; i < allPosts.length; ++i)
      if (allPosts[i].bookmarked) 
        out.push(allPosts[i]);
    return out;
  }, [allPosts])

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "bookmarks",
      showBackButton: true
    }))
  }, [])

  return (
    <>
      {posts.map((post) => <Post post={post} key={post.id} />)}
    </>
  )
}

export default Bookmarks