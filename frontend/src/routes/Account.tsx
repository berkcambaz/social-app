import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

function Account() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "account",
      forAny: true,
      showBackButton: true
    }))
  }, [])

  return <div>account</div>
}

export default Account