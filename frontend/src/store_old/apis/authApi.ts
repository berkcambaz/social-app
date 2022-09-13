import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (props: { usertag: string, password: string }) =>
        ({ url: "/auth/login", method: "POST", body: { ...props } })
    }),
    signup: build.mutation({
      query: (props: { usertag: string, email: string, password: string }) =>
        ({ url: "/auth/signup", method: "POST", body: { ...props } })
    }),
    logout: build.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" })
    }),
    auth: build.mutation({
      query: () => ({ url: "/auth/auth", method: "POST" })
    }),
  })
})

export const { useLoginMutation, useSignupMutation, useLogoutMutation, useAuthMutation } = authApi