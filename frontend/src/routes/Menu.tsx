import { Bookmark, Info, Logout, Person, Translate } from "@styled-icons/material-rounded";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setRoute({
      name: "menu",
      showBackButton: true
    }))
  }, [])

  const gotoAccount = () => navigate("/account");
  const gotoBookmarks = () => navigate("/bookmarks");
  const gotoLanguages = () => navigate("/languages");
  const gotoAbout = () => navigate("/about");
  const logout = () => navigate("/login");

  return (
    <Wrapper>
      <Item onClick={gotoAccount}>
        <Icon as={Person} />
        <Text>account</Text>
      </Item>
      <Item onClick={gotoBookmarks}>
        <Icon as={Bookmark} />
        <Text>bookmarks</Text>
      </Item>
      <Item onClick={gotoLanguages}>
        <Icon as={Translate} />
        <Text>languages</Text>
      </Item>
      <Item onClick={gotoAbout}>
        <Icon as={Info} />
        <Text>about</Text>
      </Item>
      <Item onClick={logout}>
        <Icon as={Logout} />
        <Text>log out</Text>
      </Item>
    </Wrapper>
  )
}

export default Menu