import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IUser } from "../../../../shared/types";
import { useUserStore } from "../../store/userStore";
import Button from "../Util/Button";
import HoverMenu from "../Util/HoverMenu"
import MultiInput from "../Util/MultiInput";
import SingleInput from "../Util/SingleInput";
import Spinner, { useWait } from "../Util/Spinner";

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSpinner = styled(Spinner)`
  margin: 0;
`;

interface Props {
  user: IUser;
  show: boolean;
  setShow: (show: boolean) => void;
}

function UserEditProfile({ user, show, setShow }: Props) {
  const { t } = useTranslation();

  const [username, setUsername] = useState({ limit: 32, length: user.name.length, value: user.name });
  const [bio, setBio] = useState({ limit: 256, length: user.bio.length, value: user.bio });

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);

  const onInputUsername = () => {
    if (!usernameRef.current) return;
    setUsername({
      ...username,
      length: usernameRef.current.value.length,
      value: usernameRef.current.value
    })
  }

  const onInputBio = () => {
    if (!bioRef.current) return;
    setBio({
      ...bio,
      length: bioRef.current.value.length,
      value: bioRef.current.value
    })
  }

  useLayoutEffect(() => {
    if (usernameRef.current) usernameRef.current.value = username.value;
    if (bioRef.current) bioRef.current.value = bio.value;
  }, [])

  const [spinner, setSpinner] = useState(false);
  const editUser = useUserStore(state => state.editUser);
  const doEditUser = async () => {
    if (spinner) return;

    const outUsername = username.value.trim();
    const outBio = bio.value.trim();

    if (outUsername.length === 0 || outUsername.length > 32) return;
    if (outBio.length > 256) return;

    setSpinner(true);
    await useWait(() => editUser(outUsername, outBio))();
    setSpinner(false);
    setShow(false);
  }

  return (
    <HoverMenu show={show} setShow={setShow}>
      <TextWrapper>
        <label htmlFor="usermame">{t("username")}</label>
        {`${username.length}/${username.limit}`}
      </TextWrapper>
      <SingleInput type="text" onInput={onInputUsername} placeholder={t("username")} ref={usernameRef} />
      <TextWrapper>
        <label htmlFor="bio">{t("bio")}</label>
        {`${bio.length}/${bio.limit}`}
      </TextWrapper>
      <MultiInput onInput={onInputBio} placeholder={t("bio")} ref={bioRef} />
      <Button size="small" onClick={doEditUser}>{t("save")}</Button>
      {spinner && <SpinnerWrapper><StyledSpinner /></SpinnerWrapper>}
    </HoverMenu>
  )
}

export default UserEditProfile