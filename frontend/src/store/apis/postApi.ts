import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';
import { store } from '../store';

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    likePost: build.mutation({
      query: (props: { postId: number }) =>
        ({ url: "/post/likePost", method: "POST", body: { ...props } })
    }),
    bookmarkPost: build.mutation({
      query: (props: { postId: number }) =>
        ({ url: "/post/bookmarkPost", method: "POST", body: { ...props } })
    }),
    postPost: build.mutation({
      query: (props: { content: string }) =>
        ({ url: "/post/postPost", method: "POST", body: { ...props } })
    }),
    getFeedPosts: build.query({
      query: (props: { type: "newer" | "older", refresh?: boolean }) =>
      ({
        url: "/post/getFeedPosts", method: "POST", body: {
          anchor: getAnchor(props.type, props.refresh),
          type: props.type
        }
      })
    }),
    getUserPosts: build.query({
      query: (props: { userId: number, type: "newer" | "older", refresh?: boolean }) =>
      ({
        url: "/post/getUserPosts", method: "POST", body: {
          userId: props.userId,
          anchor: getAnchor(props.type, props.refresh),
          type: props.type
        }
      })
    }),
    getBookmarkedPosts: build.query({
      query: (props: { type: "newer" | "older", refresh?: boolean }) =>
      ({
        url: "/post/getBookmarkedPosts", method: "POST", body: {
          anchor: getAnchor(props.type, props.refresh),
          type: props.type
        }
      })
    }),
  })
})

// TODO: Potential bug
function getAnchor(type: "newer" | "older", refresh?: boolean): number {
  const ids = store.getState().post.posts.ids;

  if (ids.length === 0 || refresh) return -1;
  const out = type === "newer" ? ids[0] : ids[ids.length - 1];
  return out === undefined ? -1 : out as number;
}

export const {
  useLikePostMutation,
  useBookmarkPostMutation,

  usePostPostMutation,

  useGetFeedPostsQuery,
  useLazyGetFeedPostsQuery,

  useLazyGetUserPostsQuery,
  useGetBookmarkedPostsQuery,
} = postApi