import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IUser } from "../../../shared/types";
import UserSummary from "../components/UserSummary";
import SingleInput from "../components/Util/SingleInput";
import Spinner from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { useUserStore } from "../store/userStore";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 1rem 0;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Search() {
  const { t } = useTranslation();

  const fetchSearchUser = useUserStore(state => state.fetchSearchUser)
  const [users, setUsers] = useState<IUser[]>([]);
  const [spinner, setSpinner] = useState(false);
  const typed = useRef<boolean[]>([]);
  const user = useRef("");

  const onInput = (ev: FormEvent<HTMLInputElement>) => {
    user.current = ev.currentTarget.value.trim();
    if (user.current.length === 0 || user.current.length > 32) {
      setUsers([]);
      setSpinner(false);
      return;
    }

    setSpinner(true);
    typed.current.push(true);

    setTimeout(async () => {
      typed.current.pop();

      if (typed.current.length !== 0) return;
      if (user.current.length === 0 || user.current.length > 32) return;

      const summaries = await fetchSearchUser(user.current);

      if (typed.current.length !== 0) return;
      if (user.current.length === 0 || user.current.length > 32) return;

      setUsers(summaries);
      setSpinner(false);
    }, 1000);
  }

  const setRoute = useAppStore(state => state.setRoute);
  useEffect(() => {
    setRoute({
      name: "search",
      path: location.pathname,
    })
  }, [])

  return (
    <div>
      <InputWrapper>
        <SingleInput type="text" placeholder={t("user")} onInput={onInput} />
      </InputWrapper>
      {
        spinner ?
          <SpinnerWrapper><Spinner /></SpinnerWrapper> :
          <div>{users.map(user => <UserSummary user={user} key={user.id} />)}</div>
      }
    </div>
  )
}

export default Search