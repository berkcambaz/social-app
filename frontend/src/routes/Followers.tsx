import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { setRoute } from "../store/slices/appSlice";

function Followers() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "followers",
      path: location.pathname,
      showBackButton: true,
    }))
  }, [])

  return (
    <div>
      <User />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
    </div>
  )
}

export default Followers