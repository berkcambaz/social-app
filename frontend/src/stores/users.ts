import { api } from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
import { ApiCode, type IUser } from "../../../shared/types";

interface State {
  authorized: boolean;
  entities: { [key: number]: IUser };
  ids: number[];
  pendingIds: { [key: number]: boolean };
}

export const useUsers = defineStore("users", {
  state: (): State => ({
    authorized: false,
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
  },
  actions: {
    async auth() {
      if (this.$state.authorized) return;

      const { data, err } = await api(ApiCode.Auth, {});
      if (err || !data) return;
      this.$state.authorized = true;
    },
    async signup(usertag: string, email: string, password: string) {
      const { data, err } = await api(ApiCode.Signup, { usertag, email, password });
      if (err || !data) return;

      this.$state.authorized = true;
      router.push("/home");
    },
    async login(usertag: string, password: string) {
      const { data, err } = await api(ApiCode.Login, { usertag, password });
      if (err || !data) return;

      this.$state.authorized = true;
      router.push("/home");
    },
    async getUsers(userIds: number[]) {
      userIds = userIds.filter(id => {
        if (this.pendingIds[id]) return false;
        if (this.entities[id]) return false;
        this.pendingIds[id] = true;
        return true;
      })

      if (userIds.length === 0 || userIds.length > 25) return;

      const { data, err } = await api(ApiCode.GetUser, { userIds });
      userIds.forEach(id => { delete this.pendingIds[id]; });
      if (err || !data) return;

      const users = data.users;
      users.forEach((user) => {
        this.entities[user.id] = user;
        this.ids.push(user.id);
      })
    }
  }
})