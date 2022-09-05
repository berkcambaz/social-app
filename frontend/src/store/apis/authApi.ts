import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (props: { usertag: string, password: string }) =>
        ({ url: "/login", method: "POST", body: { ...props } })
    }),
    signup: builder.mutation({
      query: (props: { usertag: string, email: string, password: string }) =>
        ({ url: "/signup", method: "POST", body: { ...props } })
    })
  })
})

export const { useLoginMutation, useSignupMutation } = authApi