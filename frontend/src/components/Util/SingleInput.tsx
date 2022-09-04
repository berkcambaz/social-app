import { HTMLInputTypeAttribute } from "react";
import styled from "styled-components"

const StyledInput = styled.input`
  box-sizing: content-box;

  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
`;

interface Props {
  type: HTMLInputTypeAttribute;
}

function SingleInput({ type }: Props) {
  return <StyledInput type={type} />
}

export default SingleInput