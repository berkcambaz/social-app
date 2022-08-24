import { api } from "@/api/api";
import { defineStore } from "pinia";
import { ApiCode, type IPost } from "../../../shared/types";
import { useUsers } from "./users";

interface State {
  entities: { [key: number]: IPost },
  ids: number[],
  getState: "ready" | "pending"
}

export const usePosts = defineStore("posts", {
  state: (): State => ({
    entities: {},
    ids: [],
    getState: "ready"
  }),
  getters: {
    getAllPosts: (state) => {
      const posts: IPost[] = [];
      state.ids.forEach(id => { posts.push(state.entities[id]) })
      return posts;
    },
    getPostById: (state) => {
      return (id: number) => state.entities[id]
    }
  },
  actions: {
    async post(content: string) {
      const { data, err } = await api(ApiCode.PostPost, { content });
      if (!data || err) return;

      const post = data.post;
      this.$state.entities[post.id] = post;
      this.$state.ids.push(post.id);
      this.sort();
    },
    async get() {
      if (this.getState !== "ready") return;
      this.getState = "pending";

      const { data, err } = await api(ApiCode.GetPost, { anchor: -1, type: "newer" });
      this.getState = "ready";
      if (!data || err) return;

      const users = useUsers();
      const posts = data.posts;
      const userIds: number[] = [];
      posts.forEach(post => {
        this.entities[post.id] = post;
        this.ids.push(post.id);
        userIds.push(post.userId);
      })
      users.getUsers(userIds);
      this.sort();
    },
    sort() {
      this.ids.sort((a, b) => (b - a));
    }
  }
})