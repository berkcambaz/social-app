import styled, { css } from "styled-components"

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
    </Wrapper>
  )
}

export default User