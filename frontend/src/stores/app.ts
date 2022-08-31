import { defineStore } from "pinia";

interface State {
  loading: boolean;
}

export const useApp = defineStore("app", {
  state: (): State => ({
    loading: true
  })
})