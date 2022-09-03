import { ArrowBack } from "@styled-icons/material-rounded";
import styled from "styled-components"
import { InnerContainer, OuterContainer } from "./style"

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LeftWrapper = styled.div`

`;

function TopBar() {
  return (
    <OuterContainer type="top">
      <InnerContainer type="top">
        <RightWrapper>
          <ArrowBack size={32} />
        </RightWrapper>
        <LeftWrapper>

        </LeftWrapper>
      </InnerContainer>
    </OuterContainer>
  )
}

export default TopBar