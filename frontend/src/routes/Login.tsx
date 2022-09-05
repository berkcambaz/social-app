import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Util/Button";
import SingleInput from "../components/Util/SingleInput";
import { useLoginMutation } from "../store/apis/authApi";
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
  const [loginProps, setLoginProps] = useState({ usertag: "", password: "" });
  const [login, result] = useLoginMutation();

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

  const doLogin = () => {
    const usertag = loginProps.usertag;
    const password = loginProps.password;

    login({ usertag, password });
  }

  const gotoSignup = () => {
    navigate("/signup");
  }

  const onInputUsertag = (ev: FormEvent<HTMLInputElement>) => {
    setLoginProps({
      ...loginProps,
      usertag: ev.currentTarget.value
    })
  }

  const onInputPassword = (ev: FormEvent<HTMLInputElement>) => {
    setLoginProps({
      ...loginProps,
      password: ev.currentTarget.value
    })
  }

  return (
    <Wrapper>
      <SingleInput type="text" onInput={onInputUsertag} placeholder="usertag..." />
      <SingleInput type="password" onInput={onInputPassword} placeholder="password..." />
      <Button size="small" onClick={doLogin}>login</Button>
      <Text onClick={gotoSignup}>i don't have an account</Text>
    </Wrapper>
  )
}

export default Login