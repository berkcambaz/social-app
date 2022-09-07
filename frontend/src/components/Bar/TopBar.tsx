import { ArrowBack, Menu } from "@styled-icons/material-rounded";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { useAppSelector } from "../../store/hooks";
import { Icon } from "../../style/styled";
import { InnerContainer, OuterContainer } from "./style"

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LeftWrapper = styled.div`

`;

const Title = styled.span<{ margin: boolean }>`
  ${props => props.margin ? css` margin-left: 1rem;` : ""}
  font-size: ${props => props.theme.font.big}px;
`;

function TopBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const route = useAppSelector((state) => state.app.routeProperties);

  const goBack = () => {
    navigate(-1);
  }

  const toggleMenu = () => {
    if (route.name !== "menu") navigate("/menu");
    else if (route.path) navigate(route.path);
  }

  return (
    <OuterContainer type="top">
      <InnerContainer type="top">
        <RightWrapper>
          {route.showBackButton ? <Icon as={ArrowBack} onClick={goBack} /> : ""}
          <Title margin={!route.showBackButton}>{t(route.name as any)}</Title>
        </RightWrapper>
        <LeftWrapper>
          <Icon as={Menu} onClick={toggleMenu} />
        </LeftWrapper>
      </InnerContainer>
    </OuterContainer>
  )
}

export default TopBar