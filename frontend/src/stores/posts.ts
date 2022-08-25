import { api } from "@/api/api";
import { defineStore } from "pinia";
import type { IPost, IUser } from "../../../shared/types";
import { useUsers } from "./users";

interface State {
  entities: { [key: number]: IPost },
  ids: number[]
}

export const usePosts = defineStore("posts", {
  state: (): State => ({
    entities: {},
    ids: []
  }),
  getters: {
    getAllPosts: (state) => {
      const posts: IPost[] = [];
      state.ids.forEach(id => { posts.push(state.entities[id]) })
      return posts;
    },
    getPostById: (state) => {
      return (id: number) => state.entities[id]
    },
    getAllPostsByUser: (state) => {
      return (user: IUser) => {
        const posts: IPost[] = [];
        for (let i = 0; i < state.ids.length; ++i) {
          if (state.entities[state.ids[i]].userId === user.id)
            posts.push(state.entities[state.ids[i]]);
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
      //const { data, err } = await api(ApiCode.GetFeedPosts, { anchor: -1, type: "newer" });
      //if (!data || err) return;
      //
      //const users = useUsers();
      //const posts = data.posts;
      //const userIds: number[] = [];
      //posts.forEach(post => {
      //  this.entities[post.id] = post;
      //  this.ids.push(post.id);
      //  userIds.push(post.userId);
      //})
      //users.fetchUsersById(userIds);
      //this.sort();
    },
    async fetchUserPosts(userId: number) {
      //const { data, err } = await api(ApiCode.GetUserPosts, { userId: userId, anchor: -1, type: "newer" });
      //if (!data || err) return;
      //
      //const users = useUsers();
      //const posts = data.posts;
      //const userIds: number[] = [userId];
      //posts.forEach(post => {
      //  this.entities[post.id] = post;
      //  this.ids.push(post.id);
      //})
      //users.fetchUsersById(userIds);
      //this.sort();
    },
    sort() {
      // Convert array -> set -> array in order to remove duplicates
      this.ids = [... new Set(this.ids)];
      this.ids.sort((a, b) => (b - a));
    }
  }
})