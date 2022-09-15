import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import Post from "../components/Post";
import User from "../components/User";
import Spinner, { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";
import { usePostStore } from "../store/postStore";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  border-bottom: 1px solid #000000;
`;

const TopSpinner = styled(Spinner)`
  margin-bottom: 0;
`;

const BottomSpinner = styled(Spinner)`
  margin-top: 0;
`;

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

  const doFetchUserPosts = (type: "newer" | "older") => {
    if (!user) return Promise.resolve();
    return fetchUserPosts(user.id, type);
  }

  return (
    <div>
      {showUser && user ? <User user={user} /> : <SpinnerWrapper><Spinner /></SpinnerWrapper>}
      <InfiniteScroll
        onTop={useWait(() => doFetchUserPosts("newer"))}
        onBottom={useWait(() => doFetchUserPosts("older"))}
        topSpinner={<TopSpinner />}
        bottomSpinner={<BottomSpinner />}
      >
        {showPosts ? posts.map((post) => <Post post={post} key={post.id} />) : <Spinner />}
      </InfiniteScroll>
    </div>
  )
}

export default UserRoute