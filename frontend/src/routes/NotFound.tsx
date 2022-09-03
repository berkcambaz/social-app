import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/slices/appSlice";

function NotFound() {
  const dispatch = useDispatch();
  dispatch(setRoute({
    forAny: true,
    showBackButton: true
  }))

  return <div>not found</div>
}

export default NotFound