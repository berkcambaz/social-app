import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "../components/Post";
import User from "../components/User";
import { setRoute } from "../store/slices/appSlice";

function UserRoute() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setRoute({ showBackButton: true })) }, [])

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