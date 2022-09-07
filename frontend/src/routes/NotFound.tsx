import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function NotFound() {
  const dispatch = useAppDispatch();
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