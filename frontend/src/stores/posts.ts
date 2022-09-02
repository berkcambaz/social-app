import { api } from "@/api/api";
import { defineStore } from "pinia";
import type { IPost, IUser } from "../../../shared/types";

interface State {
  feedPosts: { [key: number]: IPost },
  feedPostIds: number[],
  userPosts: { [key: number]: IPost },
  userPostIds: number[],
  bookmarkedPosts: { [key: number]: IPost },
  bookmarkedPostIds: number[],
}

export const usePosts = defineStore("posts", {
  state: (): State => ({
    feedPosts: {},
    feedPostIds: [],
    userPosts: {},
    userPostIds: [],
    bookmarkedPosts: {},
    bookmarkedPostIds: [],
  }),
  getters: {
    getFeedPosts: (state) => {
      const posts: IPost[] = [];
      state.feedPostIds.forEach(id => { posts.push(state.feedPosts[id]) })
      return posts;
    },
    getUserPosts: (state) => {
      return (user: IUser) => {
        const posts: IPost[] = [];
        for (let i = 0; i < state.userPostIds.length; ++i) {
          if (state.userPosts[state.userPostIds[i]].userId === user.id)
            posts.push(state.userPosts[state.userPostIds[i]]);
        }
        return posts;
      }
    },
    getBookmarkedPosts: (state) => {
      const posts: IPost[] = [];
      state.bookmarkedPostIds.forEach(id => { posts.push(state.bookmarkedPosts[id]) })
      return posts;
    },
  },
  actions: {
    async post(content: string) {
      const { data, err } = await api.postPost(content);
      if (data.post === undefined || err) return;

      const post = data.post;
      this.feedPosts[post.id] = post;
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
      if (!this.bookmarkedPosts[post.id]) return;
      const index = this.bookmarkedPostIds.findIndex((id) => id === post.id);
      if (index !== undefined) {
        this.bookmarkedPostIds.splice(index, 1);
        delete this.bookmarkedPosts[post.id];
      }
    },
    async delete(post: IPost) {
      const { data, err } = await api.deletePost(post.id);
      if (err) return;

      delete this.feedPosts[post.id];
      const feedPostId = this.feedPostIds.findIndex((id) => id === post.id);
      if (feedPostId !== -1) this.feedPostIds.splice(feedPostId, 1);

      delete this.userPosts[post.id];
      const userPostId = this.userPostIds.findIndex((id) => id === post.id);
      if (userPostId !== -1) this.userPostIds.splice(userPostId, 1);
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
        this.feedPosts[post.id] = post;
        this.feedPostIds.push(post.id);
      })
      this.sortFeedPosts();
    },
    async fetchUserPosts(userId: number, type: "newer" | "older", refresh?: boolean) {
      const anchor = this.userPostIds.length === 0 || refresh ? -1 :
        type === "newer" ?
          this.userPostIds[0] :
          this.userPostIds[this.userPostIds.length - 1];

      const { data, err } = await api.getUserPosts(userId, anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.userPosts[post.id] = post;
        this.userPostIds.push(post.id);
      })
      this.sortUserPosts();
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
        this.bookmarkedPosts[post.id] = post;
        this.bookmarkedPostIds.push(post.id);
      })
      this.sortBookmarkedPosts();
    },
    sortFeedPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.feedPostIds = [... new Set(this.feedPostIds)];
      this.feedPostIds.sort((a, b) => (b - a));
    },
    sortUserPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.userPostIds = [... new Set(this.userPostIds)];
      this.userPostIds.sort((a, b) => (b - a));
    },
    sortBookmarkedPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.bookmarkedPostIds = [... new Set(this.bookmarkedPostIds)];
      this.bookmarkedPostIds.sort((a, b) => (b - a));
    }
  }
})