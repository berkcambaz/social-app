import { useDispatch } from "react-redux";
import { setRoute } from "../store/slices/appSlice";

function Search() {
  const dispatch = useDispatch();
  dispatch(setRoute({}))

  return <div>search</div>
}

export default Search