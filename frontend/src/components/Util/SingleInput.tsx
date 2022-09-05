import { HTMLInputTypeAttribute } from "react";
import styled from "styled-components"

const StyledInput = styled.input`
  box-sizing: content-box;
  line-height: normal;
  
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
  padding-bottom: 1px;
`;

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

function SingleInput({ type, placeholder }: Props) {
  return <StyledInput type={type} placeholder={placeholder} />
}

export default SingleInput