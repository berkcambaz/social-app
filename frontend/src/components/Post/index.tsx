import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, MoreHoriz } from "@styled-icons/material-rounded";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { IPost } from "../../../../shared/types";
import { useBookmarkPostMutation, useGetBookmarkedPostsQuery, useLikePostMutation } from "../../store/apis/postApi";
import { useGetUserByIdQuery } from "../../store/apis/userApi";
import { useAppSelector } from "../../store/hooks";
import { selectAllPosts } from "../../store/slices/postSlice";
import { selectUserById } from "../../store/slices/userSlice";

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

function Post({ post }: { post: IPost }) {
  const { } = useGetUserByIdQuery({ userId: post.userId });

  const [like, likeResult] = useLikePostMutation();
  const [bookmark, bookmarkResult] = useBookmarkPostMutation();

  const doLike = () => like({ postId: post.id });
  const doBookmark = () => bookmark({ postId: post.id });

  const navigate = useNavigate();
  const gotoUser = () => navigate(`/user/${user?.tag}`)

  const user = useAppSelector((state) => selectUserById(state, 1));

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
          <Date>2 hours ago</Date>
        </TopWrapper>
        <Icon as={MoreHoriz} />
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