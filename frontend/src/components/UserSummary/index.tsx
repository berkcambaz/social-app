import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import Button from "../Button";

const Wrapper = styled.div`
  cursor: pointer;

  padding: 1rem 0;
  border-bottom: 1px solid #000000;
  
  &:last-child {
    border-bottom: 0;
  }
`;

const UserInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserInfoInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  align-items: baseline;
`;

const UsertagHandle = styled.span`
  white-space: nowrap;
`;

const overflowEllipsis = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Username = styled.span`
  ${overflowEllipsis}
  margin-right: 0.25rem;
`;

const Usertag = styled.span`
  ${overflowEllipsis}
  margin-right: 0.25rem;
`;

const FollowsYou = styled.span`
  border-bottom: 1px solid #000000;
  white-space: nowrap;
`;

const Bio = styled.div`
  padding: 0.5rem 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Follow = styled.div`
  margin-right: 0.5rem;
  padding-bottom: 0.25rem;
  white-space: nowrap;
`;

function UserSummary() {
  const navigate = useNavigate();

  const gotoUser = () => {
    navigate("/user/aaa");
  }

  const follow = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
  }

  return (
    <Wrapper onClick={gotoUser}>
      <UserInfoOuterWrapper>
        <UserInfoInnerWrapper>
          <Username>Berk Cambazzzzzz</Username>
          <UsertagHandle>@</UsertagHandle>
          <Usertag>berkcambazzzzzzz</Usertag>
          <FollowsYou>follows you</FollowsYou>
        </UserInfoInnerWrapper>
      </UserInfoOuterWrapper>
      <Bio>
        Quis tempor nulla qui nisi consequat anim ex dolor adipisicing velit sit anim dolore.
      </Bio>
      <Bottom>
        <FollowContainer>
          <Follow>10 followings</Follow>
          <Follow>10 followers</Follow>
        </FollowContainer>
        <Button size="big" onClick={follow}>follow</Button>
      </Bottom>
    </Wrapper>
  )
}

export default UserSummary