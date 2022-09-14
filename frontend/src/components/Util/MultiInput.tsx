import React, { FormEvent, useEffect, useRef } from "react";
import styled from "styled-components"

const StyledInput = styled.textarea`
  box-sizing: content-box;
  line-height: normal;

  overflow: hidden;
  resize: none;
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
  padding-bottom: 1px;
`;

interface Props {
  onInput?: (ev: FormEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

const MultiInput = React.forwardRef<HTMLTextAreaElement, Props>(({ onInput, className, placeholder }, ref) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => { onInputCb(null) }, []);

  const onInputCb = (ev: FormEvent<HTMLTextAreaElement> | null) => {
    ev && onInput && onInput(ev);

    if (!inputRef.current) return;
    inputRef.current.style.height = "0";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  }

  return <StyledInput
    ref={(node) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }}
    onInput={onInputCb} className={className} placeholder={placeholder} />
})

export default MultiInput