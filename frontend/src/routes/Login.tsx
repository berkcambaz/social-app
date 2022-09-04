import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SingleInput from "../components/Util/SingleInput";
import { setRoute } from "../store/slices/appSlice";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "login",
      path: location.pathname,
      forGuests: true,
    }))
  }, [])

  return (
    <div>
      <SingleInput />
    </div>
  )
}

export default Login