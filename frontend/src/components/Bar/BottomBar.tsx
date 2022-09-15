import { Home, Search, Person } from "@styled-icons/material-rounded"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../store/appStore";
import { useUserStore } from "../../store/userStore";
import { Icon } from "../../style/styled"
import { InnerContainer, OuterContainer } from "./style"

function BottomBar() {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.current);
  const route = useAppStore((state) => state.route);

  const fetchUserById = useUserStore(state => state.fetchUserById);

  useEffect(() => { if (userId !== null) fetchUserById(userId); }, [])
  const user = useUserStore((state) => state.getUserById(userId))

  const gotoHome = () => navigate("/home")
  const gotoSearch = () => navigate("/search")
  const gotoUser = () => user ? navigate(`/user/${user.tag}`) : null

  if (route.forGuests) return null;

  return (
    <OuterContainer type="bottom">
      <InnerContainer type="bottom">
        <Icon as={Home} onClick={gotoHome} />
        <Icon as={Search} onClick={gotoSearch} />
        <Icon as={Person} onClick={gotoUser} />
      </InnerContainer>
    </OuterContainer>
  )
}

export default BottomBar