import { Send } from "@styled-icons/material-rounded";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components"
import { usePostStore } from "../../store/postStore";
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
  const { t } = useTranslation();

  const postPost = usePostStore(state => state.postPost);
  const [text, setText] = useState({ limit: 256, length: 0, value: "" });

  const onInput = (ev: FormEvent<HTMLTextAreaElement>) => {
    setText({
      ...text,
      length: ev.currentTarget.value.length,
      value: ev.currentTarget.value
    })
  }

  const doPostPost = () => {
    if (text.length > text.limit) return;
    postPost(text.value);
  }

  return (
    <Wrapper>
      <Input onInput={onInput} placeholder={t("post_create_text")} />
      <Bottom>
        <Icon as={Send} onClick={doPostPost} />
        <span>{`${text.length}/${text.limit}`}</span>
      </Bottom>
    </Wrapper>
  )
}

export default CreatePost