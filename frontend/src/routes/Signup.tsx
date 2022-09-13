import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Util/Button";
import SingleInput from "../components/Util/SingleInput";
import Spinner from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";

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
  const signup = useUserStore(state => state.signup);
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "signup",
      path: location.pathname,
      forGuests: true,
    })
  }, [])

  const doSignup = async () => {
    const usertag = signupProps.usertag;
    const email = signupProps.email;
    const password = signupProps.password;

    setSpinner(true);
    await signup(usertag, email, password);
    setSpinner(false);
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
      {spinner ? <Spinner /> : ""}
    </Wrapper>
  )
}

export default Signup