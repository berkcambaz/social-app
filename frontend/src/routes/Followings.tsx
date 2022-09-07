import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function Followings() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "followings",
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

export default Followings