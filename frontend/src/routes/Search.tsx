import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setRoute } from "../store/slices/appSlice";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "search",
      path: location.pathname,
    }))
  }, [])

  return <div>search</div>
}

export default Search