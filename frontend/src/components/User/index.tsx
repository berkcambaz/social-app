import { CalendarToday } from "@styled-icons/material-rounded";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { IUser } from "../../../../shared/types";
import { date } from "../../date";
import { useUserStore } from "../../store/userStore";
import UserEditProfile from "../UserEditProfile";
import Button from "../Util/Button";

const Wrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;
`;

const Username = styled.div`
  font-size: ${props => props.theme.font.big}px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const UsertagOuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UsertagInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: baseline;
`;

const UsertagHandle = styled.span`
  white-space: nowrap;
`;

const Usertag = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const FollowsYou = styled.span`
  border-bottom: 1px solid #000000;
  margin-left: 0.5rem;
  white-space: nowrap;
`;

const Bio = styled.div`
  padding-top: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`;

const Date = styled.div`
  margin-left: 0.25rem;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FollowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.25rem 0;
`;

const Follow = styled.div`
  cursor: pointer;
  
  margin-right: 0.5rem;
  white-space: nowrap;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: -1px;
  }
`;

function User({ user }: { user: IUser }) {
  const { t } = useTranslation();

  const follow = useUserStore(state => state.followUser);
  const currentUser = useUserStore(state => state.getCurrentUser());

  const params = useParams();
  const navigate = useNavigate();

  const gotoFollowings = () => navigate(`/user/${params.tag}/followings`);
  const gotoFollowers = () => navigate(`/user/${params.tag}/followers`);
  const doFollow = () => follow(user)

  const [showEdit, setShowEdit] = useState(false);

  return (
    <Wrapper>
      {showEdit && <UserEditProfile user={user} show={showEdit} setShow={setShowEdit} />}
      <Username>{user.name}</Username>
      <UsertagOuterWrapper>
        <UsertagInnerWrapper>
          <UsertagHandle>@</UsertagHandle>
          <Usertag>{user.tag}</Usertag>
          {user.follower ? <FollowsYou>{t("follows_you")}</FollowsYou> : null}
        </UsertagInnerWrapper>
      </UsertagOuterWrapper>
      <Bio>{user.bio}</Bio>
      <DateWrapper>
        <CalendarToday size={32} />
        <Date>{date.unix(user.date).format('ll')}</Date>
      </DateWrapper>
      <Bottom>
        <FollowWrapper>
          <Follow onClick={gotoFollowings}>{user.followingCount} {t("followings", { count: user.followingCount })}</Follow>
          <Follow onClick={gotoFollowers}>{user.followerCount} {t("followers", { count: user.followerCount })}</Follow>
        </FollowWrapper>
        {currentUser && currentUser.id !== user.id ? <Button size="big" onClick={doFollow}>{user.following ? t("unfollow") : t("follow")}</Button> : null}
        {currentUser && currentUser.id === user.id ? <Button size="big" onClick={() => void setShowEdit(!showEdit)}>{t("edit_profile")}</Button> : null}
      </Bottom>
    </Wrapper>
  )
}

export default User