import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "../components/Post";
import { setRoute } from "../store/slices/appSlice";


function Bookmarks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "bookmarks",
      showBackButton: true
    }))
  }, [])

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

export default Bookmarks