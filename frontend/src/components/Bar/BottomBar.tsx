import { Home,Search,Person } from "@styled-icons/material-rounded"
import { InnerContainer, OuterContainer } from "./style"

function BottomBar() {
  return (
    <OuterContainer type="bottom">
      <InnerContainer type="bottom">
        <Home size={32} />
        <Search size={32} />
        <Person size={32} />
      </InnerContainer>
    </OuterContainer>
  )
}

export default BottomBar