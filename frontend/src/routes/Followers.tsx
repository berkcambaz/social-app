import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import InfiniteScroll from "../components/Util/InfiniteScroll";
import Spinner, { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";

function Followers() {
  const params = useParams<{ tag: string }>();

  const location = useLocation();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "followers",
      path: location.pathname,
      showBackButton: true,
    })
  }, [])

  const fetchUserByTag = useUserStore(state => state.fetchUserByTag);
  const fetchUserFollowers = useUserStore(state => state.fetchUserFollowers);

  const user = useUserStore(state => state.getUserByTag(params.tag));
  const followers = useUserStore(state => state.getFollowers(user));
  const [showUser, setShowUser] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.tag) await useWait(() => fetchUserByTag(params.tag!))();
      setShowUser(true);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (showUser) return;
      if (user) await useWait(() => fetchUserFollowers(user, "newer"))();
      setShowFollowers(true);
    })()
  }, [showUser])

  if (!user) return null;

  return (
    <div>
      <User user={user} />
      <InfiniteScroll
        onTop={useWait(() => fetchUserFollowers(user, "newer"))}
        onBottom={useWait(() => fetchUserFollowers(user, "older"))}
      >
        {showFollowers ? followers.map((follower) => <UserSummary user={follower} key={follower.id} />) : <Spinner />}
      </InfiniteScroll>
    </div>
  )
}

export default Followers