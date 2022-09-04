import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setRoute } from "../store/slices/appSlice";

function NotFound() {
  const dispatch = useDispatch();
  const location = useLocation();

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