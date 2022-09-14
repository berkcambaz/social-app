import { FormEvent, useLayoutEffect, useRef, useState } from "react";
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
  const [username, setUsername] = useState({ limit: 32, length: user.name.length, value: user.name });
  const [bio, setBio] = useState({ limit: 256, length: user.bio.length, value: user.bio });

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);

  const onInputUsername = (ev: FormEvent<HTMLInputElement>) => {
    setUsername({
      ...username,
      length: ev.currentTarget.value.length,
      value: ev.currentTarget.value
    })
  }

  const onInputBio = (ev: FormEvent<HTMLTextAreaElement>) => {
    setBio({
      ...bio,
      length: ev.currentTarget.value.length,
      value: ev.currentTarget.value
    })
  }

  useLayoutEffect(() => {
    if (usernameRef.current) usernameRef.current.value = username.value;
    if (bioRef.current) bioRef.current.value = bio.value;
  }, [])

  const [spinner, setSpinner] = useState(false);
  const editUser = useUserStore(state => state.editUser);
  const doEditUser = async () => {
    setSpinner(true);
    await useWait(() => editUser(username.value, bio.value))();
    setSpinner(false);
    setShow(false);
  }

  return (
    <HoverMenu show={show} setShow={setShow}>
      <TextWrapper>
        <label htmlFor="usermame">username</label>
        {`${username.length}/${username.limit}`}
      </TextWrapper>
      <SingleInput type="text" onInput={onInputUsername} placeholder="username..." ref={usernameRef} />
      <TextWrapper>
        <label htmlFor="bio">bio</label>
        {`${bio.length}/${bio.limit}`}
      </TextWrapper>
      <MultiInput onInput={onInputBio} placeholder="bio..." ref={bioRef} />
      <Button size="small" onClick={doEditUser}>done</Button>
      {spinner && <SpinnerWrapper><StyledSpinner /></SpinnerWrapper>}
    </HoverMenu>
  )
}

export default UserEditProfile