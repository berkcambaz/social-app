import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/slices/appSlice";

function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "menu",
      showBackButton: true
    }))
  }, [])

  return <div>menu</div>
}

export default Menu