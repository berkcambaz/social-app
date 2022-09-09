import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import User from "../components/User";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function UserRoute() {
  const params = useParams<{ tag: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "user",
      showBackButton: true,
      path: location.pathname,
    }))
  }, [])

  return (
    <div>
      <User tag={params.tag} />
    </div>
  )
}

export default UserRoute