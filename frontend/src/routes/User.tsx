import { useDispatch } from "react-redux";
import { setRoute } from "../store/slices/appSlice";

function User() {
  const dispatch = useDispatch();
  dispatch(setRoute({
    showBackButton: true
  }))

  return <div>user</div>
}

export default User