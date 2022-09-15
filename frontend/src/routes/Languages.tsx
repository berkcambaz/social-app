import { useEffect } from "react";
import styled, { css } from "styled-components";

import langTr from "../assets/turkey.svg";
import langEn from "../assets/usa.svg";
import { Done } from "@styled-icons/material-rounded";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/appStore";

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

const Icon = styled.button<{ hide: boolean }>`
  box-sizing: content-box;
  width: 32px;
  height: 32px;
  padding: 0.5rem;
  ${props => props.hide ? css`visibility: hidden;` : ""};
`;

const Image = styled.img`
  box-sizing: content-box;
  width: 48px;
  height: 48px;
  padding: 0.25rem;
`;

function Languages() {
  const { i18n } = useTranslation();

  const setRoute = useAppStore(state => state.setRoute);
  useEffect(() => {
    setRoute({
      name: "languages",
      forAny: true,
      showBackButton: true
    })
  }, [])

  return (
    <Wrapper>
      <Item onClick={() => { i18n.changeLanguage("en") }}>
        <Icon as={Done} hide={i18n.languages[0] !== "en"} />
        <Image src={langEn} />
      </Item>
      <Item onClick={() => { i18n.changeLanguage("tr") }}>
        <Icon as={Done} hide={i18n.languages[0] !== "tr"} />
        <Image src={langTr} />
      </Item>
    </Wrapper>
  )
}

export default Languages