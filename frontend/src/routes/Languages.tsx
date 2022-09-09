import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function Languages() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "languages",
      forAny: true,
      showBackButton: true
    }))
  }, [])

  return <div>languages</div>
}

export default Languages