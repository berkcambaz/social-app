import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../components/Util/Button";
import SingleInput from "../components/Util/SingleInput";
import Spinner, { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";
import { validate } from "email-validator"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
`;

const Input = styled(SingleInput) <{ error?: boolean }>`
  ${props => props.error && css`color: red;`}
`;

const Text = styled.div`
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
`;

const Info = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  margin-top: 0.25rem;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
`;

const InfoError = styled.div<{ error?: boolean }>`
  ${props => props.error && css`color: red;`}
`;

function Signup() {
  const { t } = useTranslation();

  const [signupProps, setSignupProps] = useState({ usertag: "", email: "", password: "" });
  const signup = useUserStore(state => state.signup);
  const [spinner, setSpinner] = useState(false);
  const [info, setInfo] = useState({ usertag: false, email: false, password: false })
  const [errors, setErrors] = useState({
    usertagLength: true,
    usertagCharacters: false,
    passwordLength: true,
    emailValid: true
  })

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
    await useWait(() => signup(usertag, email, password))();
    setSpinner(false);
  }

  const gotoLogin = () => {
    navigate("/login");
  }

  const onInputUsertag = (ev: FormEvent<HTMLInputElement>) => {
    const usertag = ev.currentTarget.value;
    setSignupProps({ ...signupProps, usertag })
    setErrors({
      ...errors,
      usertagLength: usertag.length < 3 || usertag.length > 16,
      usertagCharacters: !/^[a-z0-9]*$/.test(usertag),
    })
  }

  const onInputEmail = (ev: FormEvent<HTMLInputElement>) => {
    const email = ev.currentTarget.value;
    setSignupProps({ ...signupProps, email })
    setErrors({ ...errors, emailValid: !validate(email) })
  }

  const onInputPassword = (ev: FormEvent<HTMLInputElement>) => {
    const password = ev.currentTarget.value;
    setSignupProps({ ...signupProps, password })
    setErrors({ ...errors, passwordLength: password.length < 8 })
  }

  const usertagError = () => errors.usertagLength || errors.usertagCharacters;
  const emailError = () => errors.emailValid;
  const passwordError = () => errors.passwordLength;

  const onFocusUsertag = () => void setInfo({ ...info, usertag: true })
  const onBlurUsertag = () => void setInfo({ ...info, usertag: false })
  const onFocusEmail = () => void setInfo({ ...info, email: true })
  const onBlurEmail = () => void setInfo({ ...info, email: false })
  const onFocusPassword = () => void setInfo({ ...info, password: true })
  const onBlurPassword = () => void setInfo({ ...info, password: false })

  return (
    <Wrapper>
      <div>
        <Input type="text" error={usertagError() && !info.usertag} onInput={onInputUsertag} placeholder={t("usertag")} onFocus={onFocusUsertag} onBlur={onBlurUsertag} />
        {info.usertag &&
          <Info>
            <InfoError error={errors.usertagLength}>{t("error_usertag_length")}</InfoError>
            <InfoError error={errors.usertagCharacters}>{t("error_usertag_letters")}</InfoError>
            <InfoError error={errors.usertagCharacters}>{t("error_usertag_numbers")}</InfoError>
          </Info>
        }
      </div>

      <div>
        <Input type="email" error={emailError() && !info.email} onInput={onInputEmail} placeholder={t("email")} onFocus={onFocusEmail} onBlur={onBlurEmail} />
        {info.email &&
          <Info>
            <InfoError error={errors.emailValid}>{t("error_email_valid")}</InfoError>
          </Info>
        }
      </div>

      <div>
        <Input type="password" error={passwordError() && !info.password} onInput={onInputPassword} placeholder={t("password")} onFocus={onFocusPassword} onBlur={onBlurPassword} />
        {info.password &&
          <Info>
            <InfoError error={errors.passwordLength}>{t("error_password_length")}</InfoError>
          </Info>
        }
      </div>

      <Button size="small" onClick={doSignup}>{t("signup")}</Button>
      <Text onClick={gotoLogin}>{t("i_already_have_an_account")}</Text>
      {spinner ? <Spinner /> : ""}
    </Wrapper>
  )
}

export default Signup