import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query'
import { useMemo } from 'react'

export const customBaseQuery: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> =
  async (args, api, extraOptions) => {
    const options: RequestInit = { method: args.method }
    if (args.body !== undefined) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(args.body)
    }

    const res = await fetch(`/api${args.url}`, options);

    if (!res.ok) return { error: { status: res.status, data: await res.json() } }
    return { data: await res.json() };
  }

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFeedPostsParams = () => {
  const feedPosts = useAppSelector(state => state.post.feedPosts);

  return useMemo(() => (type: "newer" | "older", refresh?: boolean) => {
    const anchor = getAnchor(Object.keys(feedPosts), type, refresh);
    return { anchor, type }
  }, [feedPosts])
}

function getAnchor(arr: string[], type: "newer" | "older", refresh?: boolean): number {
  if (arr.length === 0 || refresh) return -1;
  const out = type === "newer" ? arr[0] : arr[arr.length - 1];
  return out === undefined ? -1 : parseInt(out);
}