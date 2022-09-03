import { defineStore } from "pinia";

interface State {
  initialLoad: "loading" | "waiting" | "done";
  loading: "loading" | "waiting" | "done";
  routeBeforeMenu: string;
}

export const useApp = defineStore("app", {
  state: (): State => ({
    initialLoad: "loading",
    loading: "loading",
    routeBeforeMenu: "/home",
  })
})