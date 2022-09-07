import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Util/Button";
import SingleInput from "../components/Util/SingleInput";
import Spinner from "../components/Util/Spinner";
import { useSignupMutation } from "../store/apis/authApi";
import { useAppDispatch } from "../store/hooks";
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

function Signup() {
  const [signupProps, setSignupProps] = useState({ usertag: "", email: "", password: "" });
  const [signup, result] = useSignupMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRoute({
      name: "signup",
      path: location.pathname,
      forGuests: true,
    }))
  }, [])

  const doSignup = () => {
    const usertag = signupProps.usertag;
    const email = signupProps.email;
    const password = signupProps.password;

    signup({ usertag, email, password });
  }

  const gotoLogin = () => {
    navigate("/login");
  }

  const onInputUsertag = (ev: FormEvent<HTMLInputElement>) => {
    setSignupProps({
      ...signupProps,
      usertag: ev.currentTarget.value
    })
  }

  const onInputEmail = (ev: FormEvent<HTMLInputElement>) => {
    setSignupProps({
      ...signupProps,
      email: ev.currentTarget.value
    })
  }

  const onInputPassword = (ev: FormEvent<HTMLInputElement>) => {
    setSignupProps({
      ...signupProps,
      password: ev.currentTarget.value
    })
  }

  return (
    <Wrapper>
      <SingleInput type="text" onInput={onInputUsertag} placeholder="usertag..." />
      <SingleInput type="email" onInput={onInputEmail} placeholder="email..." />
      <SingleInput type="password" onInput={onInputPassword} placeholder="password..." />
      <Button size="small" onClick={doSignup}>signup</Button>
      <Text onClick={gotoLogin}>i already have an account</Text>
      {result.isLoading ? <Spinner /> : ""}
    </Wrapper>
  )
}

export default Signup