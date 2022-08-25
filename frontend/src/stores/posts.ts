import { api } from "@/api/api";
import { defineStore } from "pinia";
import type { IPost, IUser } from "../../../shared/types";
import { useUsers } from "./users";

interface State {
  feedPosts: { [key: number]: IPost },
  feedPostIds: number[],
  userPosts: { [key: number]: IPost },
  userPostIds: number[],
}

export const usePosts = defineStore("posts", {
  state: (): State => ({
    feedPosts: {},
    feedPostIds: [],
    userPosts: {},
    userPostIds: [],
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
    }
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
    },
    async fetchFeedPosts() {
      const anchor = this.feedPostIds.length === 0 ? -1 : this.feedPostIds[this.feedPostIds.length - 1];
      const { data, err } = await api.getFeedPosts(anchor, "older");
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.feedPosts[post.id] = post;
        this.feedPostIds.push(post.id);
      })
      this.sortFeedPosts();
    },
    async fetchUserPosts(userId: number) {
      const anchor = this.userPostIds.length === 0 ? -1 : this.userPostIds[this.userPostIds.length - 1];
      const { data, err } = await api.getUserPosts(userId, anchor, "older");
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.userPosts[post.id] = post;
        this.userPostIds.push(post.id);
      })
      this.sortUserPosts();
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
    }
  }
})