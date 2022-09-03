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
        const user = state.entities[id];
        return user ? user : null;
      }
    },
    getUserByTag: (state) => {
      return (tag: string) => {
        for (const key in state.entities) {
          const user = state.entities[key];
          if (!user) continue;
          if (user.tag === tag) return user;
        }
        return null;
      }
    },
    getCurrentUser: (state) => {
      if (state.current === null) return null;
      const user = state.entities[state.current];
      return user ? user : null;
    },
    getFollowers: (state) => {
      return (user: IUser | null) => {
        if (!user) return [];

        const followersArray = state.followers[user.id];
        if (!followersArray) return [];

        const followers: IUser[] = [];
        followersArray.forEach(id => {
          const follower = state.entities[id];
          if (follower) followers.push(follower);
        })

        return followers;
      }
    },
    getFollowings: (state) => {
      return (user: IUser | null) => {
        if (!user) return [];

        const followingsArray = state.followings[user.id];
        if (!followingsArray) return [];

        const followings: IUser[] = [];
        followingsArray.forEach(id => {
          const following = state.entities[id];
          if (following) followings.push(following);
        })

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
      const { err } = await api.logout();
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

      user.following = data.state;
      user.followerCount += data.state ? +1 : -1;

      const currentUser = this.getCurrentUser;
      if (!currentUser) return;
      currentUser.followingCount += data.state ? +1 : -1;
    },
    async fetchUserFollowers(userId: number, type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getUserFollowers(userId, getAnchor(this.followers[userId], type, refresh), type);
      if (err || data.users === undefined || data.users.length === 0) return;

      if (!this.followers[userId]) this.followers[userId] = [];
      const followers = this.followers[userId] as number[];

      const users = data.users;
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
        if (followers) followers.push(user.id);
      })
      this.removeArrayDuplicates(followers);
    },
    async fetchUserFollowings(userId: number, type: "newer" | "older", refresh?: boolean) {
      const { data, err } = await api.getUserFollowings(userId, getAnchor(this.followings[userId], type, refresh), type);
      if (err || data.users === undefined || data.users.length === 0) return;

      if (!this.followings[userId]) this.followings[userId] = [];
      const followings = this.followings[userId] as number[];

      const users = data.users;
      users.forEach((user) => {
        if (!this.entities[user.id]) this.ids.push(user.id);
        this.entities[user.id] = user;
        if (followings) followings.push(user.id);
      })
      this.removeArrayDuplicates(followings);
    },
    async editUser(username: string, bio: string) {
      const { err } = await api.editUser(username, bio);
      if (err) return;

      const user = this.getCurrentUser;
      if (!user) return;
      user.name = username.trim();
      user.bio = bio.trim();
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
    removeArrayDuplicates(arr: number[]) {
      // Convert array -> set -> array in order to remove duplicates
      arr = [... new Set(arr)];
    }
  }
})

function getAnchor(arr: number[] | undefined, type: "newer" | "older", refresh?: boolean): number {
  if (!arr || arr.length === 0 || refresh) return -1;
  const out = type === "newer" ? arr[0] : arr[arr.length - 1];
  return out === undefined ? -1 : out;
}