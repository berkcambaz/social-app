import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"
import { setRoute } from "../store/slices/appSlice"

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "home",
      path: location.pathname,
    }))
  }, [])

  return (
    <>
      <CreatePost />
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