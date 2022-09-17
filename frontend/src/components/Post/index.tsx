import { Bookmark, BookmarkBorder, Delete, Favorite, FavoriteBorder, MoreHoriz } from "@styled-icons/material-rounded";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { IPost } from "../../../../shared/types";
import { date } from "../../date";
import { usePostStore } from "../../store/postStore";
import { useUserStore } from "../../store/userStore";
import { useViewToggler } from "../Util/hooks";

const Wrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Mid = styled.div`
  padding: 0 0 0.25rem 1rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserInfo = styled.div`
  cursor: pointer;

  display: grid;
  grid-template-columns: auto auto auto;
  margin-bottom: 1px;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
  }
`;

const overflowEllipsis = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Username = styled.div`
  ${overflowEllipsis}
  padding-right: 0.25rem;
`;

const Usertag = styled.div`
  ${overflowEllipsis}
`;

const Date = styled.div`
  margin: 0 0.25rem;
  white-space: nowrap;
`;

const Text = styled.span`
  margin-right: 0.25rem;
`;

const Icon = styled.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;

const MoreWrapper = styled.div`
  position: relative;
`;

const More = styled.div`
  position: absolute;
  right: 0;
  z-index: 999;

  background-color: #000000;
  border-radius: 5px;
`;

const MoreItem = styled.div`
  cursor: pointer;

  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  
  display: flex;
  align-items: center;
  color: #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const MoreText = styled.div`
  padding: 0 0.25rem;
`;

function Post({ post }: { post: IPost }) {
  const { t } = useTranslation();

  const fetchUserById = useUserStore(state => state.fetchUserById);
  const user = useUserStore(state => state.getUserById(post.userId));
  const currentUser = useUserStore(state => state.getCurrentUser());

  const like = usePostStore(state => state.likePost)
  const bookmark = usePostStore(state => state.bookmarkPost)
  const deletePost = usePostStore(state => state.deletePost);

  const doLike = () => like(post);
  const doBookmark = () => bookmark(post);
  const doDelete = () => deletePost(post);

  const navigate = useNavigate();
  const gotoUser = () => navigate(`/user/${user?.tag}`)

  const toggleShowMore = () => { if (user && currentUser && user.id === currentUser.id) setShowMore(!showMore); }
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useViewToggler(moreRef);

  useEffect(() => { if (!user) fetchUserById(post.userId) }, []);

  if (!user) return null;

  return (
    <Wrapper>
      <Top>
        <TopWrapper>
          <UserInfo onClick={gotoUser}>
            <Username>{user.name}</Username>
            <span>@</span>
            <Usertag>{user.tag}</Usertag>
          </UserInfo>
          <Date title={date.unix(post.date).format('lll')}>{date.unix(post.date).fromNow()}</Date>
        </TopWrapper>
        <MoreWrapper>
          <Icon as={MoreHoriz} onClick={toggleShowMore} />
          {showMore &&
            <More ref={moreRef}>
              <MoreItem onClick={doDelete}>
                <Icon as={Delete} />
                <MoreText>{t("delete")}</MoreText>
              </MoreItem>
            </More>
          }
        </MoreWrapper>
      </Top>
      <Mid>{post.content}</Mid>
      <Bottom>
        <Text>{post.likeCount}</Text>
        <Icon as={post.liked ? Favorite : FavoriteBorder} onClick={doLike} />
        <Icon as={post.bookmarked ? Bookmark : BookmarkBorder} onClick={doBookmark} />
      </Bottom>
    </Wrapper>
  )
}

export default Post