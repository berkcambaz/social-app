import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';

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
      query: (props: { anchor: number, type: "newer" | "older" }) =>
        ({ url: "/post/getFeedPosts", method: "POST", body: { ...props } })
    })
  })
})

export const {
  useLikePostMutation,
  useBookmarkPostMutation,
  usePostPostMutation,
  useGetFeedPostsQuery,
} = postApi