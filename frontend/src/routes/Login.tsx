import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Util/Button";
import SingleInput from "../components/Util/SingleInput";
import { setRoute } from "../store/slices/appSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
`;

const Text = styled.div`
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
`;

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "login",
      path: location.pathname,
      forGuests: true,
    }))
  }, [])

  const login = () => {

  }

  const gotoSignup = () => {
    navigate("/signup");
  }

  return (
    <Wrapper>
      <SingleInput type="text" placeholder="usertag..." />
      <SingleInput type="password" placeholder="password..." />
      <Button size="small" onClick={login}>login</Button>
      <Text onClick={gotoSignup}>i don't have an account</Text>
    </Wrapper>
  )
}

export default Login