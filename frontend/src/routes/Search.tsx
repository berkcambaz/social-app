import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/slices/appSlice";

function Search() {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(setRoute({})) }, [])

  return <div>search</div>
}

export default Search