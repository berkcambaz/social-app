import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import Post from "../components/Post";
import User from "../components/User";
import { useLazyGetUserPostsQuery } from "../store/apis/postApi";
import { useLazyGetUserByTagQuery } from "../store/apis/userApi";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { useUserPosts } from "../store/slices/postSlice";
import { useUserByTag } from "../store/slices/userSlice";

function UserRoute() {
  const params = useParams<{ tag: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "user",
      showBackButton: true,
      path: location.pathname,
    }))
  }, [])

  const [getUserByTag] = useLazyGetUserByTagQuery();
  const [getUserPosts] = useLazyGetUserPostsQuery();

  const user = useUserByTag(params.tag);
  const posts = useUserPosts(user);

  useEffect(() => { if (params.tag) getUserByTag({ usertag: params.tag }) }, [params])
  useEffect(() => { if (user) getUserPosts({ userId: user.id, type: "newer" }) }, [user])

  if (!user) return null;

  return (
    <div>
      <User user={user} />
      <InfiniteScroll
        onTop={() => getUserPosts({ userId: user.id, type: "newer" }).unwrap()}
        onBottom={() => getUserPosts({ userId: user.id, type: "older" }).unwrap()}
      >
        <div>{posts.map((post) => <Post post={post} key={post.id} />)}</div>
      </InfiniteScroll>
    </div>
  )
}

export default UserRoute