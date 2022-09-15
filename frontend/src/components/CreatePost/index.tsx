import { Send } from "@styled-icons/material-rounded";
import { useRef, useState } from "react";
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
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const onInput = () => {
    if (!contentRef.current) return;
    setText({
      ...text,
      length: contentRef.current.value.length,
      value: contentRef.current.value
    })
  }

  const doPostPost = async () => {
    // TODO: Better posting with spinners etc.
    
    const content = text.value.trim();
    if (content.length > text.limit) return;

    if (contentRef.current) {
      contentRef.current.value = "";
      onInput();
    }

    await postPost(content);
  }

  return (
    <Wrapper>
      <Input onInput={onInput} placeholder={t("post_create_text")} ref={contentRef} />
      <Bottom>
        <Icon as={Send} onClick={doPostPost} />
        <span>{`${text.length}/${text.limit}`}</span>
      </Bottom>
    </Wrapper>
  )
}

export default CreatePost