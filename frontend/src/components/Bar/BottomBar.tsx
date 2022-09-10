import { Home, Search, Person } from "@styled-icons/material-rounded"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useLazyGetUserByIdQuery } from "../../store/apis/userApi";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/userSlice";
import { Icon } from "../../style/styled"
import { InnerContainer, OuterContainer } from "./style"

function BottomBar() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.app.userId);
  const route = useAppSelector((state) => state.app.routeProperties);

  const [triggerById] = useLazyGetUserByIdQuery();
  useEffect(() => { if (userId !== undefined) triggerById({ userId }); }, [])
  const user = useAppSelector((state) => userId !== undefined ? selectUserById(state, userId) : undefined)

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