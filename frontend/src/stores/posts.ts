import { defineStore } from "pinia";
import type { IPost } from "../../../shared/types";

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
    async get() {

    }
  }
})