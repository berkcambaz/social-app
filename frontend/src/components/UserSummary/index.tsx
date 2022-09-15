import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { IUser } from "../../../../shared/types";
import { useUserStore } from "../../store/userStore";
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
  const { t } = useTranslation();

  const follow = useUserStore(state => state.followUser);
  const currentUser = useUserStore(state => state.getCurrentUser());

  const navigate = useNavigate();
  const gotoUser = () => navigate(`/user/${user.tag}`);

  const doFollow = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    follow(user);
  }

  return (
    <Wrapper onClick={gotoUser}>
      <UserInfoOuterWrapper>
        <UserInfoInnerWrapper>
          <Username>{user.name}</Username>
          <UsertagHandle>@</UsertagHandle>
          <Usertag>{user.tag}</Usertag>
          {user.follower ? <FollowsYou>{t("follows_you")}</FollowsYou> : null}
        </UserInfoInnerWrapper>
      </UserInfoOuterWrapper>
      <Bio>{user.bio}</Bio>
      <Bottom>
        <FollowContainer>
          <Follow>{user.followingCount} {t("followings", { count: user.followingCount })}</Follow>
          <Follow>{user.followerCount} {t("followers", { count: user.followerCount })}</Follow>
        </FollowContainer>
        {currentUser && currentUser.id !== user.id &&
          <Button size="big" onClick={doFollow}>{user.following ? t("unfollow") : t("follow")}</Button>
        }
      </Bottom>
    </Wrapper>
  )
}

export default UserSummary