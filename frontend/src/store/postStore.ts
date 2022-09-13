import create from "zustand"
import { immer } from 'zustand/middleware/immer'
import { IPost, IUser } from "../../../shared/types";
import api from "./api";

interface State {
  posts: { [key: number]: IPost };
  feedPostIds: number[];
  userPostIds: { [key: number]: number[] };
  bookmarkedPostIds: number[];

  getFeedPosts: () => IPost[];
  getUserPosts: (user: IUser | null) => IPost[];

  postPost: (content: string) => Promise<void>;
  likePost: (post: IPost) => Promise<void>;
  bookmarkPost: (post: IPost) => Promise<void>;
  fetchFeedPosts: (type: "newer" | "older", refresh?: boolean) => Promise<void>;
  fetchUserPosts: (userId: number, type: "newer" | "older", refresh?: boolean) => Promise<void>;
}

export const usePostStore = create(immer<State>((set, get) => ({
  posts: {},
  feedPostIds: [],
  userPostIds: {},
  bookmarkedPostIds: [],

  getFeedPosts: () => {
    const state = get();

    const posts: IPost[] = [];

    state.feedPostIds.forEach(id => {
      const post = state.posts[id];
      if (post) posts.push(post);
    })

    return posts;
  },

  getUserPosts: (user) => {
    if (user === null) return [];
    const state = get();

    const posts: IPost[] = [];
    const ids = state.userPostIds[user.id];
    if (!ids) return [];

    ids.forEach(id => {
      const post = state.posts[id];
      if (post) posts.push(post);
    })

    return posts;
  },

  postPost: async (content) => {
    const { data, err } = await api.postPost(content);
    if (err || data.post === undefined) return;

    const post = data.post;
    set((state: State) => {
      state.posts[post.id] = post;
      state.feedPostIds.push(post.id);
      state.feedPostIds = sortArray(state.feedPostIds);
    })
  },

  likePost: async (post) => {
    const { data, err } = await api.likePost(post.id);
    if (err || data.state === undefined) return;

    const liked = data.state;
    set((state) => {
      const target = state.posts[post.id];
      if (!target) return;
      target.liked = liked;
      target.likeCount += liked ? +1 : -1;
    })
  },

  bookmarkPost: async (post) => {
    const { data, err } = await api.bookmarkPost(post.id);
    if (err || data.state === undefined) return;

    const bookmarked = data.state;
    set((state) => {
      const target = state.posts[post.id];
      if (!target) return;
      target.bookmarked = bookmarked;
    })
  },

  fetchFeedPosts: async (type, refresh) => {
    const state = get();

    const { data, err } = await api.getFeedPosts(getAnchor(state.feedPostIds, type, refresh), type);
    if (err || data.posts === undefined || data.posts.length === 0) return;

    const posts = data.posts;
    set((state: State) => {
      posts.forEach(post => {
        state.posts[post.id] = post;
        state.feedPostIds.push(post.id);
      })

      state.feedPostIds = sortArray(state.feedPostIds);
    })
  },

  fetchUserPosts: async (userId, type, refresh) => {
    const state = get();

    const { data, err } = await api.getUserPosts(userId, getAnchor(state.userPostIds[userId], type, refresh), type);
    if (err || data.posts === undefined || data.posts.length === 0) return;

    const posts = data.posts;
    set((state: State) => {
      if (!state.userPostIds[userId]) state.userPostIds[userId] = [];

      posts.forEach(post => {
        state.posts[post.id] = post;
        state.userPostIds[userId]!.push(post.id);
      })

      state.userPostIds[userId] = sortArray(state.userPostIds[userId]!);
    })
  }
})))

function getAnchor(arr: number[] | undefined, type: "newer" | "older", refresh?: boolean): number {
  if (!arr || arr.length === 0 || refresh) return -1;
  const out = type === "newer" ? arr[0] : arr[arr.length - 1];
  return out === undefined ? -1 : out;
}

function sortArray(arr: number[]) {
  // Convert array -> set -> array in order to remove duplicates
  return [... new Set(arr)].sort((a, b) => (b - a));
}