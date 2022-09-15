import create from "zustand"
import { immer } from 'zustand/middleware/immer'

interface State {
  loading: boolean;
  route: {
    name: string;
    path: string;
    forGuests: boolean;
    forAny: boolean;
    showBackButton: boolean;
  };

  setLoading: (loading: boolean) => void;
  setRoute: (route: Partial<State["route"]>) => void;
}

export const useAppStore = create(immer<State>((set) => ({
  loading: true,

  route: {
    name: "",
    path: "",
    forGuests: true,
    forAny: false,
    showBackButton: false,
  },

  setLoading: (loading) => set((state: State) => {
    state.loading = loading;
  }),

  setRoute: (_route) => set((state: State) => {
    state.route.name = _route.name ?? "";
    state.route.path = _route.path ?? state.route.path;
    state.route.forGuests = _route.forGuests ?? false;
    state.route.forAny = _route.forAny ?? false;
    state.route.showBackButton = _route.showBackButton ?? false;
  })
})))