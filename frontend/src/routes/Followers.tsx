import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { useLazyGetUserByTagQuery, useLazyGetUserFollowersQuery } from "../store/apis/userApi";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { useUserByTag, useUserFollowers } from "../store/slices/userSlice";

function Followers() {
  const params = useParams<{ tag: string }>();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "followers",
      path: location.pathname,
      showBackButton: true,
    }))
  }, [])

  const user = useUserByTag(params.tag);
  const followers = useUserFollowers(user);

  const [triggerByTag] = useLazyGetUserByTagQuery();
  const [triggerFollowers] = useLazyGetUserFollowersQuery();
  useEffect(() => { if (params.tag) triggerByTag({ usertag: params.tag }) }, [params])
  useEffect(() => { if (user) triggerFollowers({ userId: user.id, anchor: -1, type: "newer" }) }, [user])

  if (!user) return null;

  return (
    <div>
      <User user={user} />
      {followers.map((follower) => <UserSummary user={follower} key={follower.id} />)}
    </div>
  )
}

export default Followers