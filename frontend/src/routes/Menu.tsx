import { Bookmark, Info, Logout, Person, Translate } from "@styled-icons/material-rounded";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`;

const Icon = styled.button`
  box-sizing: content-box;
  width: 32px;
  height: 32px;
  padding: 0.75rem;
`;

const Text = styled.span`
  font-size: ${props => props.theme.font.big}px;
`;

function Menu() {
  const { t } = useTranslation();

  const logout = useUserStore(state => state.logout);
  const currentUser = useUserStore(state => state.getCurrentUser())

  const navigate = useNavigate();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "menu",
      showBackButton: true,
      forAny: true
    })
  }, [])

  const gotoAccount = () => navigate("/account");
  const gotoBookmarks = () => navigate("/bookmarks");
  const gotoLanguages = () => navigate("/languages");
  const gotoAbout = () => navigate("/about");
  const doLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Wrapper>
      {currentUser !== undefined ?
        <Item onClick={gotoAccount}>
          <Icon as={Person} />
          <Text>{t("account")}</Text>
        </Item>
        : null}
      {currentUser !== undefined ?
        <Item onClick={gotoBookmarks}>
          <Icon as={Bookmark} />
          <Text>{t("bookmarks")}</Text>
        </Item>
        : null}
      <Item onClick={gotoLanguages}>
        <Icon as={Translate} />
        <Text>{t("languages")}</Text>
      </Item>
      <Item onClick={gotoAbout}>
        <Icon as={Info} />
        <Text>{t("about")}</Text>
      </Item>
      {currentUser !== undefined ?
        <Item onClick={doLogout}>
          <Icon as={Logout} />
          <Text>{t("logout")}</Text>
        </Item>
        : null}
    </Wrapper>
  )
}

export default Menu