import { useEffect } from "react";
import Post from "../components/Post";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";


function Bookmarks() {
  const dispatch = useAppDispatch();
  
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