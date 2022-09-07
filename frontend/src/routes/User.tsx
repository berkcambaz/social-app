import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import User from "../components/User";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function UserRoute() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "user",
      showBackButton: true,
      path: location.pathname,
    }))
  }, [])

  return (
    <div>
      <User />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default UserRoute