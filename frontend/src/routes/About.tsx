import { useEffect } from "react";
import styled from "styled-components";
import { useAppStore } from "../store/appStore";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  margin: 0.5rem 0;

  &>* {
    margin: 0.5rem 0;
  }
`;

const Title = styled.div`
  font-size: ${props => props.theme.font.huge}px;
`;

function About() {
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "about",
      forAny: true,
      showBackButton: true
    })
  }, [])

  return (
    <Wrapper>
      <Title>Chernolink</Title>
      <div>&copy; 2022 Chernolink</div>
    </Wrapper>
  )
}

export default About