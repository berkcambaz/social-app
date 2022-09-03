import { api } from "@/api/api";
import { defineStore } from "pinia";
import type { IPost, IUser } from "../../../shared/types";

interface State {
  feedPostIds: number[],
  userPostIds: { [key: number]: number[] },
  bookmarkedPostIds: number[],
  posts: { [key: number]: IPost }
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
      state.feedPostIds.forEach(id => { posts.push(state.posts[id]) })
      return posts;
    },
    getUserPosts: (state) => {
      return (user: IUser) => {
        const posts: IPost[] = [];
        if (!state.userPostIds[user.id]) return posts;
        for (let i = 0; i < state.userPostIds[user.id].length; ++i) {
          posts.push(state.posts[state.userPostIds[user.id][i]]);
        }
        return posts;
      }
    },
    getBookmarkedPosts: (state) => {
      const posts: IPost[] = [];
      state.bookmarkedPostIds.forEach(id => { posts.push(state.posts[id]) })
      return posts;
    },
  },
  actions: {
    async post(content: string) {
      const { data, err } = await api.postPost(content);
      if (data.post === undefined || err) return;

      const post = data.post;
      this.posts[post.id] = post;
      this.feedPostIds.push(post.id);
      this.sortFeedPosts();
    },
    async like(post: IPost) {
      const { data, err } = await api.likePost(post.id);
      if (data.state === undefined || err) return;

      post.liked = data.state;
      post.likeCount += data.state ? +1 : -1;
    },
    async bookmark(post: IPost) {
      const { data, err } = await api.bookmarkPost(post.id);
      if (data.state === undefined || err) return;

      post.bookmarked = data.state;
      if (data.state) return;
      const bookmarkedPostId = this.bookmarkedPostIds.findIndex((id) => id === post.id);
      if (bookmarkedPostId !== -1) this.bookmarkedPostIds.splice(bookmarkedPostId, 1);
    },
    async delete(post: IPost) {
      const { data, err } = await api.deletePost(post.id);
      if (err) return;

      delete this.posts[post.id];

      const feedPostId = this.feedPostIds.findIndex((id) => id === post.id);
      if (feedPostId !== -1) this.feedPostIds.splice(feedPostId, 1);

      if (!this.userPostIds[post.userId]) this.userPostIds[post.userId] = [];
      const userPostId = this.userPostIds[post.userId].findIndex((id) => id === post.id);
      if (userPostId !== -1) this.userPostIds[post.userId].splice(userPostId, 1);

      const bookmarkedPostId = this.bookmarkedPostIds.findIndex((id) => id === post.id);
      if (bookmarkedPostId !== -1) this.bookmarkedPostIds.splice(bookmarkedPostId, 1);
    },
    async fetchFeedPosts(type: "newer" | "older", refresh?: boolean) {
      const anchor = this.feedPostIds.length === 0 || refresh ? -1 :
        type === "newer" ?
          this.feedPostIds[0] :
          this.feedPostIds[this.feedPostIds.length - 1];

      const { data, err } = await api.getFeedPosts(anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.posts[post.id] = post;
        this.feedPostIds.push(post.id);
      })
      this.sortFeedPosts();
    },
    async fetchUserPosts(userId: number, type: "newer" | "older", refresh?: boolean) {
      const anchor = !this.userPostIds[userId] || this.userPostIds[userId].length === 0 || refresh ? -1 :
        type === "newer" ?
          this.userPostIds[userId][0] :
          this.userPostIds[userId][this.userPostIds[userId].length - 1];

      const { data, err } = await api.getUserPosts(userId, anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      if (!this.userPostIds[userId]) this.userPostIds[userId] = [];
      const posts = data.posts;
      posts.forEach(post => {
        this.posts[post.id] = post;
        this.userPostIds[userId].push(post.id);
      })
      this.sortUserPosts(userId);
    },
    async fetchBookmarkedPosts(type: "newer" | "older", refresh?: boolean) {
      const anchor = this.bookmarkedPostIds.length === 0 || refresh ? -1 :
        type === "newer" ?
          this.bookmarkedPostIds[0] :
          this.bookmarkedPostIds[this.bookmarkedPostIds.length - 1];

      const { data, err } = await api.getBookmarkedPosts(anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.posts[post.id] = post;
        this.bookmarkedPostIds.push(post.id);
      })
      this.sortBookmarkedPosts();
    },
    sortFeedPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.feedPostIds = [... new Set(this.feedPostIds)];
      this.feedPostIds.sort((a, b) => (b - a));
    },
    sortUserPosts(userId: number) {
      // Convert array -> set -> array in order to remove duplicates
      this.userPostIds[userId] = [... new Set(this.userPostIds[userId])];
      this.userPostIds[userId].sort((a, b) => (b - a));
    },
    sortBookmarkedPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.bookmarkedPostIds = [... new Set(this.bookmarkedPostIds)];
      this.bookmarkedPostIds.sort((a, b) => (b - a));
    }
  }
})