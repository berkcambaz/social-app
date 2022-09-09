import { Bookmark, Info, Logout, Person, Translate } from "@styled-icons/material-rounded";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogoutMutation } from "../store/apis/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
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
  const [logout, result] = useLogoutMutation();
  const user = useAppSelector(state => state.app.userId)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setRoute({
      name: "menu",
      showBackButton: true,
      forAny: true
    }))
  }, [])
  
  useLayoutEffect(() => {
    if (result.isError || result.isSuccess) navigate("/login");
  }, [result.status])

  const gotoAccount = () => navigate("/account");
  const gotoBookmarks = () => navigate("/bookmarks");
  const gotoLanguages = () => navigate("/languages");
  const gotoAbout = () => navigate("/about");
  const doLogout = () => logout({});

  return (
    <Wrapper>
      {user !== undefined ?
        <Item onClick={gotoAccount}>
          <Icon as={Person} />
          <Text>account</Text>
        </Item>
        : null}
      {user !== undefined ?
        <Item onClick={gotoBookmarks}>
          <Icon as={Bookmark} />
          <Text>bookmarks</Text>
        </Item>
        : null}
      <Item onClick={gotoLanguages}>
        <Icon as={Translate} />
        <Text>languages</Text>
      </Item>
      <Item onClick={gotoAbout}>
        <Icon as={Info} />
        <Text>about</Text>
      </Item>
      {user !== undefined ?
        <Item onClick={doLogout}>
          <Icon as={Logout} />
          <Text>log out</Text>
        </Item>
        : null}
    </Wrapper>
  )
}

export default Menu