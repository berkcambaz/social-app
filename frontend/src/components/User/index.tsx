import { CalendarToday } from "@styled-icons/material-rounded";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
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

function User() {
  const params = useParams();
  const navigate = useNavigate();

  const gotoFollowings = () => {
    navigate(`/user/${params.tag}/followings`);
  }

  const gotoFollowers = () => {
    navigate(`/user/${params.tag}/followers`);
  }

  const follow = () => {

  }

  const editProfile = () => {

  }

  return (
    <Wrapper>
      <Username>Berk Cambazzzzzz</Username>
      <UsertagOuterWrapper>
        <UsertagInnerWrapper>
          <UsertagHandle>@</UsertagHandle>
          <Usertag>berkcambazzzzzzz</Usertag>
          <FollowsYou>follows you</FollowsYou>
        </UsertagInnerWrapper>
      </UsertagOuterWrapper>
      <Bio>
        Quis tempor nulla qui nisi consequat anim ex dolor adipisicing velit sit anim dolore.
      </Bio>
      <DateWrapper>
        <CalendarToday size={32} />
        <Date>Aug 27, 2022</Date>
      </DateWrapper>
      <Bottom>
        <FollowWrapper>
          <Follow onClick={gotoFollowings}>10 followings</Follow>
          <Follow onClick={gotoFollowers}>10 followers</Follow>
        </FollowWrapper>
        <Button size="big" onClick={follow}>follow</Button>
        {/*<Button size="big" onClick={editProfile}>edit profile</Button>*/}
      </Bottom>
    </Wrapper>
  )
}

export default User