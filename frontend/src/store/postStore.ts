import create from "zustand"
import { immer } from 'zustand/middleware/immer'
import { IPost, IUser } from "../../../shared/types";
import api from "./api";
import { useUserStore } from "./userStore";

interface State {
  posts: { [key: number]: IPost };
  feedPostIds: number[];
  userPostIds: { [key: number]: number[] };
  bookmarkedPostIds: number[];

  getPostById: (id: number) => IPost | null;
  getFeedPosts: () => IPost[];
  getUserPosts: (user: IUser | null) => IPost[];
  getBookmarkedPosts: () => IPost[];

  postPost: (content: string, commentId: number, replyId: number) => Promise<void>;
  likePost: (post: IPost) => Promise<void>;
  bookmarkPost: (post: IPost) => Promise<void>;
  deletePost: (post: IPost) => Promise<void>;

  fetchPostById: (postId: number) => Promise<void>;
  fetchFeedPosts: (type: "newer" | "older", refresh?: boolean) => Promise<void>;
  fetchUserPosts: (userId: number, type: "newer" | "older", refresh?: boolean) => Promise<void>;
  fetchBookmarkedPosts: (type: "newer" | "older", refresh?: boolean) => Promise<void>;

  reset: () => void;
}

export const usePostStore = create<State>()(
  immer((set, get) => ({
    posts: {},
    feedPostIds: [],
    userPostIds: {},
    bookmarkedPostIds: [],

    getPostById: (id) => {
      const state = get();
      const post = state.posts[id];
      return post ? post : null;
    },

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

    getBookmarkedPosts: () => {
      const state = get();

      const posts: IPost[] = [];

      state.bookmarkedPostIds.forEach(id => {
        const post = state.posts[id];
        if (post) posts.push(post);
      })

      return posts;
    },

    postPost: async (content, commentId, replyId) => {
      const { data, err } = await api.postPost(content, commentId, replyId);
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
        removeFromArray(state.bookmarkedPostIds, target.id);
      })
    },

    deletePost: async (post) => {
      const currentUser = useUserStore.getState().getCurrentUser();
      if (currentUser === null || currentUser.id !== post.userId) return;

      const { err } = await api.deletePost(post.id);
      if (err) return;

      set((state: State) => {
        delete state.posts[post.id];
        removeFromArray(state.feedPostIds, post.id);
        removeFromArray(state.userPostIds[post.userId], post.id);
        removeFromArray(state.bookmarkedPostIds, post.id);
      })
    },

    fetchPostById: async (postId) => {
      const { data, err } = await api.getPostById(postId);
      if (err || data.post === undefined) return;

      const post = data.post;
      set((state: State) => {
        state.posts[post.id] = post;
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
    },

    fetchBookmarkedPosts: async (type, refresh) => {
      const state = get();

      const { data, err } = await api.getBookmarkedPosts(getAnchor(state.bookmarkedPostIds, type, refresh), type);
      if (err || data.posts === undefined || data.posts.length === 0) return;

      const posts = data.posts;
      set((state: State) => {
        posts.forEach(post => {
          state.posts[post.id] = post;
          state.bookmarkedPostIds.push(post.id);
        })

        state.bookmarkedPostIds = sortArray(state.bookmarkedPostIds);
      })
    },

    reset: () => set((state: State) => {
      state.posts = {};
      state.feedPostIds = [];
      state.userPostIds = {};
      state.bookmarkedPostIds = [];
    }),
  }))
)

function getAnchor(arr: number[] | undefined, type: "newer" | "older", refresh?: boolean): number {
  if (!arr || arr.length === 0 || refresh) return -1;
  const out = type === "newer" ? arr[0] : arr[arr.length - 1];
  return out === undefined ? -1 : out;
}

function sortArray(arr: number[]) {
  // Convert array -> set -> array in order to remove duplicates
  return [... new Set(arr)].sort((a, b) => (b - a));
}

function removeFromArray(arr: number[] | undefined, element: number) {
  if (!arr) return;

  const index = arr.findIndex(id => id === element);
  if (index !== -1) arr.splice(index, 1);
}