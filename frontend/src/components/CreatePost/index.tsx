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

interface Props {
  className?: string;
  postId?: number;
  commentId?: number;
}

function CreatePost({ className, postId, commentId }: Props) {
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
      contentRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }

    await postPost(content, postId === undefined ? -1 : postId, commentId === undefined ? -1 : commentId);
  }

  return (
    <Wrapper className={className}>
      <Input onInput={onInput} placeholder={t("post_create_text")} ref={contentRef} />
      <Bottom>
        <Icon as={Send} onClick={doPostPost} />
        <span>{`${text.length}/${text.limit}`}</span>
      </Bottom>
    </Wrapper>
  )
}

export default CreatePost