import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Util/Button";
import SingleInput from "../components/Util/SingleInput";
import Spinner, { useWait } from "../components/Util/Spinner";
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

function Login() {
  const { t } = useTranslation();

  const [loginProps, setLoginProps] = useState({ usertag: "", password: "" });
  const login = useUserStore(state => state.login);
  const [spinner, setSpinner] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "login",
      path: location.pathname,
      forGuests: true,
    })
  }, [])

  const doLogin = async () => {
    const usertag = loginProps.usertag;
    const password = loginProps.password;

    setSpinner(true);
    await useWait(() => login(usertag, password))();
    setSpinner(false);
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
      <SingleInput type="text" onInput={onInputUsertag} placeholder={t("usertag")} />
      <SingleInput type="password" onInput={onInputPassword} placeholder={t("password")} />
      <Button size="small" onClick={doLogin}>{t("login")}</Button>
      <Text onClick={gotoSignup}>{t("i_dont_have_an_account")}</Text>
      {spinner ? <Spinner /> : ""}
    </Wrapper>
  )
}

export default Login