import { MouseEvent, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { IUser } from "../../../../shared/types";
import { useAppSelector } from "../../store/hooks";
import Button from "../Util/Button";

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
  margin: 0.25rem 0;
`;

const Follow = styled.div`
  margin-right: 0.5rem;
  white-space: nowrap;
`;

function UserSummary({ user }: { user: IUser }) {
  const navigate = useNavigate();

  const userId = useAppSelector(state => state.app.userId) as number;

  const gotoUser = () => navigate(`/user/${user.tag}`);

  const follow = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
  }

  return (
    <Wrapper onClick={gotoUser}>
      <UserInfoOuterWrapper>
        <UserInfoInnerWrapper>
          <Username>{user.name}</Username>
          <UsertagHandle>@</UsertagHandle>
          <Usertag>{user.tag}</Usertag>
          {user.follower ? <FollowsYou>follows you</FollowsYou> : null}
        </UserInfoInnerWrapper>
      </UserInfoOuterWrapper>
      <Bio>{user.bio}</Bio>
      <Bottom>
        <FollowContainer>
          <Follow>{user.followingCount} followings</Follow>
          <Follow>{user.followerCount} followers</Follow>
        </FollowContainer>
        {user.id !== userId ? <Button size="big" onClick={follow}>follow</Button> : null}
      </Bottom>
    </Wrapper>
  )
}

export default UserSummary