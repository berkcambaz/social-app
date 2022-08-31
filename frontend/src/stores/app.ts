import { defineStore } from "pinia";

interface State {
  initialLoad: "loading" | "waiting" | "done";
  loading: "loading" | "waiting" | "done";
}

export const useApp = defineStore("app", {
  state: (): State => ({
    initialLoad: "loading",
    loading: "loading",
  })
})