import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import Spinner, { useWait } from "../components/Util/Spinner";
import { useAppStore } from "../store/appStore";
import { usePostStore } from "../store/postStore";

const MainPost = styled(Post)`
  border-bottom: 0;
`;

const StyledCreatePost = styled(CreatePost)`
  padding-top: 0;
`;

function PostRoute() {
  const params = useParams<{ id: string }>();

  const location = useLocation();
  const setRoute = useAppStore(state => state.setRoute);

  useEffect(() => {
    setRoute({
      name: "post",
      path: location.pathname,
      showBackButton: true,
    })
  }, [])

  const fetchPostById = usePostStore(state => state.fetchPostById);
  const fetchPostComments = usePostStore(state => state.fetchPostComments);

  const post = usePostStore(state => state.getPostById(parseInt(params.id!)));
  const main = usePostStore(state => state.getPostById(post?.commentId!));

  const comments = usePostStore(state => {
    if (!post) return;
    const id = parseInt(params.id!)
    if (post.commentId === -1) return state.getPostComments(id);
    else return state.getCommentReplies(post.commentId);
  });

  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.id) await useWait(() => fetchPostById(parseInt(params.id!)))();
      setShowPost(true);
    })()
  }, [params])

  useEffect(() => {
    (async () => {
      if (!showPost) return;
      if (post) await useWait(() => fetchPostComments(post.id, post.commentId, "newer", true))();
      if (post && post.commentId !== -1) await useWait(() => fetchPostById(post.commentId))();
      setShowComments(true);
    })()
  }, [showPost, params])

  return (
    <div>
      {main && main !== post && <Post post={main} key={main.id} />}
      {showPost && post ?
        <>
          <MainPost post={post} />
          <StyledCreatePost postId={post.id} commentId={post.commentId} />
        </>
        : <Spinner />
      }
      {showComments && comments ?
        comments.map((comment) => <Post post={comment} key={comment.id} />)
        : <Spinner />
      }
    </div>
  )
}

export default PostRoute