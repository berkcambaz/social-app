import { Home, Search, Person } from "@styled-icons/material-rounded"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../style/styled"
import { InnerContainer, OuterContainer } from "./style"

function BottomBar() {
  const navigate = useNavigate();

  return (
    <OuterContainer type="bottom">
      <InnerContainer type="bottom">
        <Icon as={Home} onClick={() => { navigate("/home") }} />
        <Icon as={Search} onClick={() => { navigate("/search") }} />
        <Icon as={Person} onClick={() => { navigate("/user/aaa") }} />
      </InnerContainer>
    </OuterContainer>
  )
}

export default BottomBar