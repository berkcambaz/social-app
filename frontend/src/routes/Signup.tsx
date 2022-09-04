import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setRoute } from "../store/slices/appSlice";

function Signup() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "signup",
      path: location.pathname,
      forGuests: true,
    }))
  }, [])

  return <div>signup</div>
}

export default Signup