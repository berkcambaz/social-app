import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { useLazyGetUserByTagQuery, useLazyGetUserFollowingsQuery } from "../store/apis/userApi";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { useUserByTag, useUserFollowings } from "../store/slices/userSlice";

function Followings() {
  const params = useParams<{ tag: string }>();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "followings",
      path: location.pathname,
      showBackButton: true,
    }))
  }, [])

  const user = useUserByTag(params.tag);
  const followings = useUserFollowings(user);

  const [triggerByTag] = useLazyGetUserByTagQuery();
  const [triggerFollowings] = useLazyGetUserFollowingsQuery();

  useEffect(() => { if (params.tag) triggerByTag({ usertag: params.tag }) }, [params])
  useEffect(() => { if (user) triggerFollowings({ userId: user.id, anchor: -1, type: "newer" }) }, [user])

  if (!user) return null;

  return (
    <div>
      <User user={user} />
      {followings.map((following) => <UserSummary user={following} key={following.id} />)}
    </div>
  )
}

export default Followings