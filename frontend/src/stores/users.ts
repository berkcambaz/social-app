import { api } from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
import type { IUser } from "../../../shared/types";
import { usePosts } from "./posts";

interface State {
  current: number | null;

  entities: { [key: number]: IUser };
  ids: number[];

  pendingIds: { [key: number]: boolean };
  pendingTags: { [key: string]: boolean };

  followers: { [key: number]: number[] };
  followings: { [key: number]: number[] };
}

export const useUsers = defineStore("users", {
  state: (): State => ({
    current: null,

    entities: {},
    ids: [],

    pendingIds: {},
    pendingTags: {},

    followers: {},
    followings: {},
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
      this.$reset();

      // Cleanup posts 
      usePosts().$reset();
    },
    async fetchUserById(userId: number) {
      if (this.pendingIds[userId]) return;
      this.pendingIds[userId] = true;

      const { data, err } = await api.getUserById(userId);

      delete this.pendingIds[userId];

      if (data.user === undefined || err) return;

      const user = data.user;
      if (!this.entities[user.id]) this.ids.push(user.id);
      this.entities[user.id] = user;
    },
    async fetchUserByTag(usertag: string) {
      if (this.pendingTags[usertag]) return;
      this.pendingTags[usertag] = true;

      const { data, err } = await api.getUserByTag(usertag);
      if (data.user === undefined || err) return;

      delete this.pendingTags[usertag];

      const user = data.user;
      if (!this.entities[user.id]) this.ids.push(user.id);
      this.entities[user.id] = user;
    },
    async follow(user: IUser) {
      const { data, err } = await api.followUser(user.id);
      if (data.state === undefined || err) return;

      this.entities[user.id].following = data.state;
      this.entities[user.id].followerCount += data.state ? +1 : -1;
    },
    async fetchUserFollowers(userId: number, type: "newer" | "older", refresh?: boolean) {
      const anchor = !this.followers[userId] || this.followers[userId].length === 0 || refresh ? -1 :
        type === "newer" ?
          this.followers[userId][0] :
          this.followers[userId][this.followers[userId].length - 1];

      const { data, err } = await api.getUserFollowers(userId, anchor, type);
      if (data.users === undefined || data.users.length === 0 || err) return;

      console.log(data.users);

      const users = data.users;
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
        if (!this.followers[userId] || refresh) this.followers[userId] = [];
        this.followers[userId].push(user.id);
      })
      this.removeFollowerDuplicates(userId);
    },

    async fetchUserFollowings(userId: number, type: "newer" | "older", refresh?: boolean) {
      const anchor = !this.followings[userId] || this.followings[userId].length === 0 || refresh ? -1 :
        type === "newer" ?
          this.followings[userId][0] :
          this.followings[userId][this.followings[userId].length - 1];

      const { data, err } = await api.getUserFollowings(userId, anchor, type);
      if (data.users === undefined || data.users.length === 0 || err) return;

      console.log(data.users);

      const users = data.users;
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
        if (!this.followings[userId] || refresh) this.followings[userId] = [];
        this.followings[userId].push(user.id);
      })
      this.removeFollowerDuplicates(userId);
    },
    removeFollowerDuplicates(userId: number) {
      // Convert array -> set -> array in order to remove duplicates
      this.followers[userId] = [... new Set(this.followers[userId])];
    },
    removeFollowingDuplicates(userId: number) {
      // Convert array -> set -> array in order to remove duplicates
      this.followings[userId] = [... new Set(this.followings[userId])];
    }
  }
})
