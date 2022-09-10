import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IUser } from "../../../shared/types";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { useLazyGetUserByTagQuery, useLazyGetUserFollowingsQuery } from "../store/apis/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { selectAllFollowings, selectAllUserEntities, selectAllUserIds } from "../store/slices/userSlice";

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

  const allUsers = useAppSelector(selectAllUserIds);
  const userEntities = useAppSelector(selectAllUserEntities);
  const allFollowings = useAppSelector(selectAllFollowings);
  const user = useMemo(() => {
    for (let i = 0; i < allUsers.length; ++i)
      if (allUsers[i].tag === params.tag)
        return allUsers[i];
    return undefined;
  }, [allUsers])
  const followings = useMemo(() => {
    const out: IUser[] = [];
    if (!user || !allFollowings[user.id]) return [];
    for (let i = 0; i < allFollowings[user.id].length; ++i) {
      const follower = userEntities[allFollowings[user.id][i]];
      if (follower) out.push(follower);
    }
    return out;
  }, [allUsers, allFollowings])

  const [triggerByTag] = useLazyGetUserByTagQuery();
  const [triggerFollowings] = useLazyGetUserFollowingsQuery();
  useEffect(() => { if (params.tag) triggerByTag({ usertag: params.tag }) }, [])
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