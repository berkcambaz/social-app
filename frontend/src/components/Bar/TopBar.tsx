import { ArrowBack, Menu } from "@styled-icons/material-rounded";
import { useTranslation } from "react-i18next";
import styled from "styled-components"
import { Icon } from "../../style/styled";
import { InnerContainer, OuterContainer } from "./style"

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LeftWrapper = styled.div`

`;

const Title = styled.span`
  font-size: ${props => props.theme.font.big}px;
`;

function TopBar() {
  const { t } = useTranslation();
  
  return (
    <OuterContainer type="top">
      <InnerContainer type="top">
        <RightWrapper>
          <Icon as={ArrowBack} />
          <Title>{t("home")}</Title>
        </RightWrapper>
        <LeftWrapper>
          <Icon as={Menu} />
        </LeftWrapper>
      </InnerContainer>
    </OuterContainer>
  )
}

export default TopBar