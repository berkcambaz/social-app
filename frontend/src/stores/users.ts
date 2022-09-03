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
    getUserById: (state) => (id: number) => !state.entities[id] ? null : state.entities[id],
    getUserByTag: (state) => {
      return (tag: string) => {
        for (const key in state.entities)
          if (state.entities[key].tag === tag)
            return state.entities[key];
        return null;
      }
    },
    getCurrentUser: (state) => {
      if (state.current === null || !state.entities[state.current]) return null;
      return state.entities[state.current];
    },
    getFollowers: (state) => {
      return (user: IUser | null) => {
        const followers: IUser[] = [];
        if (!user || !state.followers[user.id]) return followers;
        state.followers[user.id].forEach(id => { followers.push(state.entities[id]) })
        return followers;
      }
    },
    getFollowings: (state) => {
      return (user: IUser | null) => {
        const followings: IUser[] = [];
        if (!user || !state.followings[user.id]) return followings;
        state.followings[user.id].forEach(id => { followings.push(state.entities[id]) })
        return followings;
      }
    }
  },
  actions: {
    async auth() {
      if (this.$state.current !== null) return;

      const { data, err } = await api.auth();
      if (err || data.userId === undefined) return;

      this.$state.current = data.userId;
    },
    async signup(usertag: string, email: string, password: string) {
      const { data, err } = await api.signup(usertag, email, password);
      if (err || data.userId === undefined) return;

      this.$state.current = data.userId;
      if (!router.currentRoute.value.query.to) router.push("/home");
      else router.push(router.currentRoute.value.query.to as string);
    },
    async login(usertag: string, password: string) {
      const { data, err } = await api.login(usertag, password);
      if (err || data.userId === undefined) return;

      this.$state.current = data.userId;
      if (!router.currentRoute.value.query.to) router.push("/home");
      else router.push(router.currentRoute.value.query.to as string);
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

      if (err || data.user === undefined) return;

      const user = data.user;
      if (!this.entities[user.id]) this.ids.push(user.id);
      this.entities[user.id] = user;
    },
    async fetchUserByTag(usertag: string) {
      if (this.pendingTags[usertag]) return;
      this.pendingTags[usertag] = true;

      const { data, err } = await api.getUserByTag(usertag);

      delete this.pendingTags[usertag];

      if (err || data.user === undefined) return;

      const user = data.user;
      if (!this.entities[user.id]) this.ids.push(user.id);
      this.entities[user.id] = user;
    },
    async follow(user: IUser) {
      const { data, err } = await api.followUser(user.id);
      if (err || data.state === undefined) return;

      this.entities[user.id].following = data.state;
      this.entities[user.id].followerCount += data.state ? +1 : -1;
      if (this.current !== null && this.entities[this.current])
        this.entities[this.current].followingCount += data.state ? +1 : -1;
    },
    async fetchUserFollowers(userId: number, type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getUserFollowers(userId, getAnchor(this.followers[userId], type, refresh), type);
      if (err || data.users === undefined || data.users.length === 0) return;

      const users = data.users;
      if (!this.followers[userId] || refresh) this.followers[userId] = [];
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
        this.followers[userId].push(user.id);
      })
      this.removeFollowerDuplicates(userId);
    },
    async fetchUserFollowings(userId: number, type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getUserFollowings(userId, getAnchor(this.followings[userId], type, refresh), type);
      if (err || data.users === undefined || data.users.length === 0) return;

      const users = data.users;
      if (!this.followings[userId] || refresh) this.followings[userId] = [];
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
        this.followings[userId].push(user.id);
      })
      this.removeFollowingDuplicates(userId);
    },
    async editUser(username: string, bio: string) {
      const { data, err } = await api.editUser(username, bio);
      if (err) return;

      if (this.current !== null && this.entities[this.current]) {
        this.entities[this.current].name = username.trim();
        this.entities[this.current].bio = bio.trim();
      }
    },
    async fetchSearchUser(user: string) {
      const { data, err } = await api.searchUser(user);
      if (err || data.users === undefined || data.users.length === 0) return [];

      const users = data.users;
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
      })
      return users;
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

function getAnchor(arr: number[] | undefined, type: "newer" | "older", refresh?: boolean) {
  return !arr || arr.length === 0 || refresh ? -1 : type === "newer" ? arr[0] : arr[arr.length - 1];
}