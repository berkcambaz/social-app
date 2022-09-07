import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import UserSummary from "../components/UserSummary";
import SingleInput from "../components/Util/SingleInput";
import { useAppDispatch } from "../store/hooks";
import { setRoute } from "../store/slices/appSlice";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 1rem 0;
`;

function Search() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setRoute({
      name: "search",
      path: location.pathname,
    }))
  }, [])

  return (
    <div>
      <InputWrapper>
        <SingleInput type="text" placeholder="user..." />
      </InputWrapper>
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
      <UserSummary />
    </div>
  )
}

export default Search