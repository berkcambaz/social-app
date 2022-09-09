import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

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
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "about",
      forAny: true,
      showBackButton: true
    }))
  }, [])

  return (
    <Wrapper>
      <Title>Chernolink</Title>
      <div>&copy; 2022 Chernolink</div>
    </Wrapper>
  )
}

export default About