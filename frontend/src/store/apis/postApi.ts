import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
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

export const { usePostPostMutation, useGetFeedPostsQuery } = postApi