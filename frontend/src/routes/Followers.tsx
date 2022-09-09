import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import User from "../components/User";
import UserSummary from "../components/UserSummary";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function Followers() {
  const params = useParams<{ tag: string }>();
  const dispatch = useAppDispatch();
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
      <User tag={params.tag} />
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