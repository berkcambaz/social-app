import styled from "styled-components"

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

const Username = styled.div`
  padding-right: 0.25rem;
`;

const Usertag = styled.div`

`;

const Date = styled.div`
  margin-left: 0.25rem;
  white-space: nowrap;
`;

function Post() {
  return (
    <Wrapper>
      <Top>
        <TopWrapper>
          <UserInfo>
            <Username>Berk Cambaz</Username>
            <span>@</span>
            <Usertag>berkcambaz</Usertag>
          </UserInfo>
          <Date>2 hours ago</Date>
        </TopWrapper>
      </Top>
      <Mid>
        abc
      </Mid>
      <Bottom>

      </Bottom>
    </Wrapper>
  )
}

export default Post