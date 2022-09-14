import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import Post from "../components/Post";
import User from "../components/User";
import Spinner, { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";
import { usePostStore } from "../store/postStore";

function UserRoute() {
  const params = useParams<{ tag: string }>();

  const location = useLocation();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "user",
      showBackButton: true,
      path: location.pathname,
    })
  }, [])

  const fetchUserByTag = useUserStore(state => state.fetchUserByTag);
  const fetchUserPosts = usePostStore(state => state.fetchUserPosts);

  const user = useUserStore(state => state.getUserByTag(params.tag));
  const posts = usePostStore(state => state.getUserPosts(user));
  const [showUser, setShowUser] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.tag) await useWait(() => fetchUserByTag(params.tag!))();
      setShowUser(true);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (showUser) return;
      if (user) await useWait(() => fetchUserPosts(user.id, "newer"))();
      setShowPosts(true);
    })()
  }, [showUser])

  if (!user) return null;

  return (
    <div>
      {showUser ? <User user={user} /> : <Spinner />}
      <InfiniteScroll
        onTop={useWait(() => fetchUserPosts(user.id, "newer"))}
        onBottom={useWait(() => fetchUserPosts(user.id, "older"))}
      >
        {showPosts ? posts.map((post) => <Post post={post} key={post.id} />) : <Spinner />}
      </InfiniteScroll>
    </div>
  )
}

export default UserRoute