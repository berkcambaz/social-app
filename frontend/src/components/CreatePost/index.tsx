import { Send } from "@styled-icons/material-rounded";
import { FormEvent, useRef, useState } from "react";
import styled from "styled-components"
import MultiInput from "../Util/MultiInput";

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const Input = styled(MultiInput)`
  width: 100%;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;

function CreatePost() {
  const [text, setText] = useState({ limit: 256, length: 0, value: "" });

  const onInput = (ev: FormEvent<HTMLTextAreaElement>) => {
    setText({
      ...text,
      length: ev.currentTarget.value.length,
      value: ev.currentTarget.value
    })
  }

  return (
    <Wrapper>
      <Input onInput={onInput} placeholder="write your thoughts..." />
      <Bottom>
        <Icon as={Send} />
        <span>{`${text.length}/${text.limit}`}</span>
      </Bottom>
    </Wrapper>
  )
}

export default CreatePost