import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IUser } from "../../../shared/types";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { useLazyGetUserByTagQuery, useLazyGetUserFollowersQuery } from "../store/apis/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { selectAllFollowers, selectAllUserEntities, selectAllUserIds } from "../store/slices/userSlice";

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

  const allUsers = useAppSelector(selectAllUserIds);
  const userEntities = useAppSelector(selectAllUserEntities);
  const allFollowers = useAppSelector(selectAllFollowers);
  const user = useMemo(() => {
    for (let i = 0; i < allUsers.length; ++i)
      if (allUsers[i].tag === params.tag)
        return allUsers[i];
    return undefined;
  }, [allUsers])
  const followers = useMemo(() => {
    const out: IUser[] = [];
    if (!user || !allFollowers[user.id]) return [];
    for (let i = 0; i < allFollowers[user.id].length; ++i) {
      const follower = userEntities[allFollowers[user.id][i]];
      if (follower) out.push(follower);
    }
    return out;
  }, [allUsers, allFollowers])

  const [triggerByTag] = useLazyGetUserByTagQuery();
  const [triggerFollowers] = useLazyGetUserFollowersQuery();
  useEffect(() => { if (params.tag) triggerByTag({ usertag: params.tag }) }, [])
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