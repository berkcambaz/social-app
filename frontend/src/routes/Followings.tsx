import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import Spinner, { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";

function Followings() {
  const params = useParams<{ tag: string }>();

  const location = useLocation();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "followings",
      path: location.pathname,
      showBackButton: true,
    })
  }, [])

  const fetchUserByTag = useUserStore(state => state.fetchUserByTag);
  const fetchUserFollowings = useUserStore(state => state.fetchUserFollowings);

  const user = useUserStore(state => state.getUserByTag(params.tag));
  const followings = useUserStore(state => state.getFollowings(user));
  const [showUser, setShowUser] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.tag) await useWait(() => fetchUserByTag(params.tag!))();
      setShowUser(true);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (showUser) return;
      if (user) await useWait(() => fetchUserFollowings(user, "newer"))();
      setShowFollowings(true);
    })()
  }, [showUser])

  if (!user) return null;

  return (
    <div>
      <User user={user} />
      <InfiniteScroll
        onTop={useWait(() => fetchUserFollowings(user, "newer"))}
        onBottom={useWait(() => fetchUserFollowings(user, "older"))}
      >
        {showFollowings ? followings.map((following) => <UserSummary user={following} key={following.id} />) : <Spinner />}
      </InfiniteScroll>
    </div>
  )
}

export default Followings