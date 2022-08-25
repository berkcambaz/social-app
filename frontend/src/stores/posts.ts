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
      //const { data, err } = await api(ApiCode.PostPost, { content });
      //if (!data || err) return;
      //
      //const post = data.post;
      //this.$state.entities[post.id] = post;
      //this.$state.ids.push(post.id);
      //this.sort();
    },
    async fetchFeedPosts() {
      const { data, err } = await api.getFeedPosts(-1, "newer");
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.feedPosts[post.id] = post;
        this.feedPostIds.push(post.id);
      })
      this.sortFeedPosts();
    },
    async fetchUserPosts(userId: number) {
      const { data, err } = await api.getUserPosts(userId, -1, "newer");
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