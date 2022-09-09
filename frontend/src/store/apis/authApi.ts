import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../hooks';
import { setUser } from '../slices/appSlice';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (props: { usertag: string, password: string }) =>
        ({ url: "/auth/login", method: "POST", body: { ...props } }),
      async onQueryStarted(arg, api) {
        const userId: number | undefined = (await api.queryFulfilled).data.userId;
        api.dispatch(setUser(userId));
      },
    }),
    signup: build.mutation({
      query: (props: { usertag: string, email: string, password: string }) =>
        ({ url: "/auth/signup", method: "POST", body: { ...props } }),
      async onQueryStarted(arg, api) {
        const userId: number | undefined = (await api.queryFulfilled).data.userId;
        api.dispatch(setUser(userId));
      },
    }),
    logout: build.mutation({
      query: () =>
        ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(arg, api) {
        api.dispatch(setUser(undefined));
      },
    }),
    auth: build.mutation({
      query: () =>
        ({ url: "/auth/auth", method: "POST" }),
      async onQueryStarted(arg, api) {
        const userId: number | undefined = (await api.queryFulfilled).data.userId;
        api.dispatch(setUser(userId));
      },
    }),
  })
})

export const { useLoginMutation, useSignupMutation, useLogoutMutation, useAuthMutation } = authApi