import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
console.log(import.meta.env);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URI}/api/auth` ?? "/api/auth" }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (props: { usertag: string, password: string }) =>
        ({ url: "/login", method: "POST", body: { ...props } }),
      transformResponse(res: {}, meta, arg) {
        console.log(meta?.response?.ok);

      },
    }),
    signup: build.mutation({
      query: (props: { usertag: string, email: string, password: string }) =>
        ({ url: "/signup", method: "POST", body: { ...props } }),
      transformResponse(res: {}, meta, arg) {
        console.log(meta?.response?.ok);

      },
    })
  })
})

export const { useLoginMutation, useSignupMutation } = authApi