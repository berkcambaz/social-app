import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    followUser: build.mutation({
      query: (props: { userId: number }) =>
        ({ url: "/user/followUser", method: "POST", body: { ...props } })
    }),
    getUserById: build.query({
      query: (props: { userId: number }) =>
        ({ url: "/user/getUserById", method: "POST", body: { ...props } })
    }),
    getUserByTag: build.query({
      query: (props: { usertag: string }) =>
        ({ url: "/user/getUserByTag", method: "POST", body: { ...props } })
    }),
    getUserFollowers: build.query({
      query: (props: { userId: number, anchor: number, type: "newer" | "older" }) =>
        ({ url: "/user/getUserFollowings", method: "POST", body: { ...props } })
    }),
    getUserFollowings: build.query({
      query: (props: { userId: number, anchor: number, type: "newer" | "older" }) =>
        ({ url: "/user/getUserFollowings", method: "POST", body: { ...props } })
    }),
  })
})

export const {
  useFollowUserMutation,

  useGetUserByIdQuery,
  useGetUserByTagQuery,

  useLazyGetUserByIdQuery,
  useLazyGetUserByTagQuery,

  useLazyGetUserFollowersQuery,
  useLazyGetUserFollowingsQuery,
} = userApi