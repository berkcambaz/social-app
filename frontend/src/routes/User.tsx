import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IPost } from "../../../shared/types";
import Post from "../components/Post";
import User from "../components/User";
import { useLazyGetUserPostsQuery } from "../store/apis/postApi";
import { useLazyGetUserByTagQuery } from "../store/apis/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";
import { selectAllPosts } from "../store/slices/postSlice";
import { selectAllUserIds } from "../store/slices/userSlice";

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

  const [triggetUserByTag] = useLazyGetUserByTagQuery();
  const [triggerUserPosts] = useLazyGetUserPostsQuery();

  const allUsers = useAppSelector(selectAllUserIds);
  const allPosts = useAppSelector(selectAllPosts);
  const user = useMemo(() => {
    for (let i = 0; i < allUsers.length; ++i)
      if (allUsers[i].tag === params.tag)
        return allUsers[i];
    return undefined;
  }, [allUsers, params])
  const posts = useMemo(() => {
    const out: IPost[] = [];
    if (!user) return [];
    for (let i = 0; i < allPosts.length; ++i)
      if (allPosts[i].userId === user.id)
        out.push(allPosts[i]);
    return out;
  }, [allPosts, user])

  useEffect(() => { if (params.tag) triggetUserByTag({ usertag: params.tag }) }, [params])
  useEffect(() => { if (user) triggerUserPosts({ userId: user.id, anchor: -1, type: "newer" }) }, [user])

  if (!user) return null;

  return (
    <div>
      <User user={user} />
      {posts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  )
}

export default UserRoute