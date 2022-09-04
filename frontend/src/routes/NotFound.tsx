import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/slices/appSlice";

function NotFound() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "404",
      forAny: true,
      showBackButton: true
    }))
  }, [])

  return <div>not found</div>
}

export default NotFound