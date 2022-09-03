import { useEffect } from "react";
import { useDispatch } from "react-redux"
import Post from "../components/Post"
import { setRoute } from "../store/slices/appSlice"

function Home() {
  const dispatch = useDispatch();
  dispatch(setRoute({}));

  return (
    <>
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
    </>
  )
}

export default Home