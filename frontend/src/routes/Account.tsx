import { useEffect } from "react";
import { useAppStore } from "../store/appStore";

function Account() {
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "account",
      forAny: true,
      showBackButton: true
    })
  }, [])

  return <div></div>
}

export default Account