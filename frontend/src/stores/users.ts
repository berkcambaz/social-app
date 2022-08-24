import { api } from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
import { ApiCode } from "../../../shared/types";

interface State {
  authorized: boolean;
  entities: { [key: number]: IUser };
  ids: number[];
}

export const useUsers = defineStore("users", {
  state: (): State => ({
    authorized: false,
    entities: {},
    ids: []
  }),
  getters: {
    getUserById: (state) => {
      return (id: number) => state.entities[id]
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
  }
})