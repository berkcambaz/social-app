import { api } from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
import type { IUser } from "../../../shared/types";
import { usePosts } from "./posts";

interface State {
  current: number | null;
  entities: { [key: number | string]: IUser };
  ids: number[];
}

export const useUsers = defineStore("users", {
  state: (): State => ({
    current: null,
    entities: {},
    ids: [],
  }),
  getters: {
    getUserById: (state) => {
      return (id: number) => {
        return state.entities[id] === undefined ? null : state.entities[id];
      }
    },
    getUserByTag: (state) => {
      return (tag: string) => {
        for (const key in state.entities) {
          if (state.entities[key].tag === tag) return state.entities[key];
        }
        return null;
      }
    },
    getCurrentUser: (state) => {
      if (state.current === null || state.entities[state.current] === undefined) return null;
      return state.entities[state.current];
    }
  },
  actions: {
    async auth() {
      if (this.$state.current !== null) return;

      const { data, err } = await api.auth();
      if (data.userId === undefined || err) return;

      this.$state.current = data.userId;
    },
    async signup(usertag: string, email: string, password: string) {
      const { data, err } = await api.signup(usertag, email, password);
      if (data.userId === undefined || err) return;

      this.$state.current = data.userId;
      router.push("/home");
    },
    async login(usertag: string, password: string) {
      const { data, err } = await api.login(usertag, password);
      if (data.userId === undefined || err) return;

      this.$state.current = data.userId;
      router.push("/home");
    },
    async logout() {
      const { data, err } = await api.logout();
      if (err) return;

      router.push("/login");

      // Cleanup users 
      this.$state.current = null;
      this.$state.entities = {};
      this.$state.ids = [];

      // Cleanup posts 
      const posts = usePosts();
      posts.$state.feedPosts = {};
      posts.$state.feedPostIds = [];
      posts.$state.userPosts = {};
      posts.$state.userPostIds = [];
    },
    async fetchUserById(userId: number) {
      const { data, err } = await api.getUserById(userId);
      if (data.user === undefined || err) return;

      const user = data.user;
      this.entities[user.id] = user;
      this.ids.push(user.id);
    },
    async fetchUserByTag(usertag: string) {
      const { data, err } = await api.getUserByTag(usertag);
      if (data.user === undefined || err) return;

      const user = data.user;
      this.entities[user.id] = user;
      this.ids.push(user.id);
    },
    async follow(user: IUser) {
      const { data, err } = await api.followUser(user.id);
      if (data.state === undefined || err) return;

      this.entities[user.id].following = data.state;
      this.entities[user.id].followerCount += data.state ? +1 : -1;
    }
  }
})
