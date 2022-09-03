import { Home, Search, Person } from "@styled-icons/material-rounded"
import { Icon } from "../../style/styled"
import { InnerContainer, OuterContainer } from "./style"

function BottomBar() {
  return (
    <OuterContainer type="bottom">
      <InnerContainer type="bottom">
        <Icon as={Home} />
        <Icon as={Search} />
        <Icon as={Person} />
      </InnerContainer>
    </OuterContainer>
  )
}

export default BottomBar