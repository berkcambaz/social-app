import { CalendarToday } from "@styled-icons/material-rounded";
import styled from "styled-components"

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

const Icon = styled.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FollowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Follow = styled.div`
  cursor: pointer;
  
  margin-right: 0.5rem;
  margin-bottom: 1px;
  white-space: nowrap;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
  }
`;

function User() {
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
          <Follow>10 followings</Follow>
          <Follow>10 followers</Follow>
        </FollowWrapper>
      </Bottom>
    </Wrapper>
  )
}

export default User