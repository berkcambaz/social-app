import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import User from "../components/User";
import { setRoute } from "../store/slices/appSlice";

function UserRoute() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "user",
      showBackButton: true,
      routeBeforeMenu: location.pathname
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