import { api } from "@/api/api";
import { defineStore } from "pinia";
import type { IPost, IUser } from "../../../shared/types";

interface State {
  feedPostIds: number[];
  userPostIds: { [key: number]: number[] };
  bookmarkedPostIds: number[];
  posts: { [key: number]: IPost };
}

export const usePosts = defineStore("posts", {
  state: (): State => ({
    feedPostIds: [],
    userPostIds: [],
    bookmarkedPostIds: [],
    posts: {},
  }),
  getters: {
    getFeedPosts: (state) => {
      const posts: IPost[] = [];

      state.feedPostIds.forEach(id => {
        const post = state.posts[id];
        if (post) posts.push(post);
      })

      return posts;
    },
    getUserPosts: (state) => {
      return (user: IUser) => {
        const posts: IPost[] = [];

        const ids = state.userPostIds[user.id];
        if (!ids) return posts;

        ids.forEach(id => {
          const post = state.posts[id];
          if (post) posts.push(post);
        })

        return posts;
      }
    },
    getBookmarkedPosts: (state) => {
      const posts: IPost[] = [];

      state.bookmarkedPostIds.forEach(id => {
        const post = state.posts[id];
        if (post) posts.push(post);
      })

      return posts;
    },
  },
  actions: {
    async post(content: string) {
      const { data, err } = await api.postPost(content);
      if (err || data.post === undefined) return;

      const post = data.post;
      this.posts[post.id] = post;
      this.feedPostIds.push(post.id);
      this.sortArray(this.feedPostIds);
    },
    async like(post: IPost) {
      const { data, err } = await api.likePost(post.id);
      if (err || data.state === undefined) return;

      post.liked = data.state;
      post.likeCount += data.state ? +1 : -1;
    },
    async bookmark(post: IPost) {
      const { data, err } = await api.bookmarkPost(post.id);
      if (err || data.state === undefined) return;

      post.bookmarked = data.state;
      if (data.state) return;

      const bookmarkedPostId = this.bookmarkedPostIds.findIndex((id) => id === post.id);
      if (bookmarkedPostId !== -1) this.bookmarkedPostIds.splice(bookmarkedPostId, 1);
    },
    async delete(post: IPost) {
      const { err } = await api.deletePost(post.id);
      if (err) return;

      delete this.posts[post.id];

      const feedPostId = this.feedPostIds.findIndex((id) => id === post.id);
      if (feedPostId !== -1) this.feedPostIds.splice(feedPostId, 1);

      let userPostIds = this.userPostIds[post.userId];
      if (!userPostIds) userPostIds = [];
      const userPostId = userPostIds.findIndex((id) => id === post.id);
      if (userPostId !== -1) userPostIds.splice(userPostId, 1);

      const bookmarkedPostId = this.bookmarkedPostIds.findIndex((id) => id === post.id);
      if (bookmarkedPostId !== -1) this.bookmarkedPostIds.splice(bookmarkedPostId, 1);
    },
    async fetchFeedPosts(type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getFeedPosts(getAnchor(this.feedPostIds, type, refresh), type);
      if (err || data.posts === undefined || data.posts.length === 0) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.posts[post.id] = post;
        this.feedPostIds.push(post.id);
      })
      this.sortArray(this.feedPostIds);
    },
    async fetchUserPosts(userId: number, type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getUserPosts(userId, getAnchor(this.userPostIds[userId], type, refresh), type);
      if (err || data.posts === undefined || data.posts.length === 0) return;

      if (!this.userPostIds[userId]) this.userPostIds[userId] = [];
      const userPostIds = this.userPostIds[userId] as number[];

      const posts = data.posts;
      posts.forEach(post => {
        this.posts[post.id] = post;
        if (userPostIds) userPostIds.push(post.id);
      })
      this.sortArray(userPostIds);
    },
    async fetchBookmarkedPosts(type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getBookmarkedPosts(getAnchor(this.bookmarkedPostIds, type, refresh), type);
      if (err || data.posts === undefined || data.posts.length === 0) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.posts[post.id] = post;
        this.bookmarkedPostIds.push(post.id);
      })
      this.sortArray(this.bookmarkedPostIds);
    },
    sortArray(arr: number[]) {
      // Convert array -> set -> array in order to remove duplicates
      arr = [... new Set(arr)];
      arr.sort((a, b) => (b - a));
    }
  }
})

function getAnchor(arr: number[] | undefined, type: "newer" | "older", refresh?: boolean): number {
  if (!arr || arr.length === 0 || refresh) return -1;
  const out = type === "newer" ? arr[0] : arr[arr.length - 1];
  return out === undefined ? -1 : out;
}