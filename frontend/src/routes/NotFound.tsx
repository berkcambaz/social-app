import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/appStore";

function NotFound() {
  const { t } = useTranslation();

  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "404",
      forAny: true,
      showBackButton: true
    })
  }, [])

  return <div>{t("page_not_found")}</div>
}

export default NotFound