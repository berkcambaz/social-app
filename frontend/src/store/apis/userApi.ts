import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getUserById: build.query({
      query: (props: { userId: number }) =>
        ({ url: "/user/getUserById", method: "POST", body: { ...props } })
    }),
    getUserByTag: build.query({
      query: (props: { usertag: string }) =>
        ({ url: "/user/getUserByTag", method: "POST", body: { ...props } })
    }),
  })
})

export const {
  useGetUserByIdQuery,
  useGetUserByTagQuery,
  useLazyGetUserByIdQuery,
  useLazyGetUserByTagQuery,
} = userApi