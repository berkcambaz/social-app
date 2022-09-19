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

  const post = usePostStore(state => state.getPostById(parseInt(params.id!)));
  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.id) await useWait(() => fetchPostById(parseInt(params.id!)))();
      setShowPost(true);
    })()
  }, [])

  return (
    <div>
      {showPost && post ?
        <>
          <MainPost post={post} />
          <StyledCreatePost postId={post.id} commentId={post.commentId} />
        </>
        : <Spinner />
      }
    </div>
  )
}

export default PostRoute