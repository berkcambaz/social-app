import { useEffect } from "react";
import { useDispatch } from "react-redux";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { setRoute } from "../store/slices/appSlice";

function Followers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "followers",
      showBackButton: true
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