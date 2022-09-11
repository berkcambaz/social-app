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
      query: (props: { type: "newer" | "older", refresh?: boolean }) => {
        return { url: "/post/getFeedPosts", method: "POST", body: { ...getAnchor(props.type, props.refresh) } }
      }
    }),
    getUserPosts: build.query({
      query: (props: { userId: number, anchor: number, type: "newer" | "older" }) =>
        ({ url: "/post/getUserPosts", method: "POST", body: { ...props } })
    }),
    getBookmarkedPosts: build.query({
      query: (props: { anchor: number, type: "newer" | "older" }) =>
        ({ url: "/post/getBookmarkedPosts", method: "POST", body: { ...props } })
    }),
  })
})

function getAnchor(type: "newer" | "older", refresh?: boolean): { anchor: number, type: "newer" | "older" } {
  const ids = store.getState().post.posts.ids;

  if (ids.length === 0 || refresh) return { anchor: -1, type };
  const out = type === "newer" ? ids[0] : ids[ids.length - 1];
  return out === undefined ? { anchor: -1, type } : { anchor: out as number, type };
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