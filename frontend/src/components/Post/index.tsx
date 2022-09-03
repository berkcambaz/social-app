import { Bookmark, Favorite, MoreHoriz } from "@styled-icons/material-rounded";
import styled, { css } from "styled-components"

const Wrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Mid = styled.div`
  padding-left: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserInfo = styled.div`
  cursor: pointer;

  display: grid;
  grid-template-columns: auto auto auto;
  margin-bottom: 1px;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
  }
`;

const overflowEllipsis = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Username = styled.div`
  ${overflowEllipsis}
  padding-right: 0.25rem;
`;

const Usertag = styled.div`
  ${overflowEllipsis}
`;

const Date = styled.div`
  margin: 0 0.25rem;
  white-space: nowrap;
`;

const Text = styled.span`
  margin-right: 0.25rem;
`;

const Icon = styled.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;

function Post() {
  return (
    <Wrapper>
      <Top>
        <TopWrapper>
          <UserInfo>
            <Username>Berk Cambazzzzzz</Username>
            <span>@</span>
            <Usertag>berkcambazzzzzzz</Usertag>
          </UserInfo>
          <Date>2 hours ago</Date>
        </TopWrapper>
        <Icon as={MoreHoriz} />
      </Top>
      <Mid>
        abc
      </Mid>
      <Bottom>
        <Text>123</Text>
        <Icon as={Favorite} />
        <Icon as={Bookmark} />
      </Bottom>
    </Wrapper>
  )
}

export default Post