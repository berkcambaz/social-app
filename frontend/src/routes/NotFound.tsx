import { useEffect } from "react";
import { useAppStore } from "../store/appStore";

function NotFound() {
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "404",
      forAny: true,
      showBackButton: true
    })
  }, [])

  return <div>not found</div>
}

export default NotFound