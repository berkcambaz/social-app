import { useEffect, useState } from "react";
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
import Spinner, { useWait } from "../components/Util/Spinner";

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
  const [showUser, setShowUser] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.tag) await useWait(() => getUserByTag({ usertag: params.tag! }).unwrap())();
      setShowUser(true);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (user) await useWait(() => getUserPosts({ userId: user.id, type: "newer" }))();
      setShowPosts(true);
    })()
  }, [showUser])

  if (!user) return null;

  return (
    <div>
      {showUser ? <User user={user} /> : <Spinner />}
      <InfiniteScroll
        onTop={() => getUserPosts({ userId: user.id, type: "newer" }).unwrap()}
        onBottom={() => getUserPosts({ userId: user.id, type: "older" }).unwrap()}
      >
        {showPosts ? posts.map((post) => <Post post={post} key={post.id} />) : <Spinner />}
      </InfiniteScroll>
    </div>
  )
}

export default UserRoute