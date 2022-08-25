import { api } from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
import type { IUser } from "../../../shared/types";

interface State {
  current: number | null;
  entities: { [key: number | string]: IUser };
  ids: number[];
  pendingIds: { [key: number]: boolean };
}

export const useUsers = defineStore("users", {
  state: (): State => ({
    current: null,
    entities: {},
    ids: [],
    pendingIds: [],
  }),
  getters: {
    getUserById: (state) => {
      return (id: number) => {
        return state.entities[id]
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
    getCurrentUser: (state) => state.current !== null ? state.entities[state.current] : null
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
      //const { data, err } = await api(ApiCode.Logout, {});
      //if (err || !data) return;
      //this.$state.current = null;
      //router.push("/login");
    },
    async fetchUsersById(userIds: number[]) {
      //userIds = userIds.filter(id => {
      //  if (this.pendingIds[id]) return false;
      //  if (this.entities[id]) return false;
      //  this.pendingIds[id] = true;
      //  return true;
      //})
      //
      //if (userIds.length === 0 || userIds.length > 25) return;
      //
      //const { data, err } = await api(ApiCode.GetUsersById, { userIds });
      //userIds.forEach(id => { delete this.pendingIds[id]; });
      //if (err || !data) return;
      //
      //const users = data.users;
      //users.forEach((user) => {
      //  this.entities[user.id] = user;
      //  this.ids.push(user.id);
      //})
    },
    async fetchUserByTag(usertag: string) {
      //const { data, err } = await api(ApiCode.GetUserByTag, { usertag });
      //if (err || !data) return;
      //
      //const user = data.user;
      //this.entities[user.id] = user;
      //this.ids.push(user.id);
    },
    async follow(state: boolean, userId: number) {
      //const { data, err } = await api(ApiCode.FollowUser, { state, userId });
      //if (err || !data) return;
      //
      //this.entities[userId].following = state;
      //if (state) this.entities[userId].followerCount++;
      //else this.entities[userId].followerCount--;
    }
  }
})