import create from "zustand"
import { immer } from 'zustand/middleware/immer'

interface State {
  route: {
    name: string;
    path: string;
    forGuests: boolean;
    forAny: boolean;
    showBackButton: boolean;
  };
  setRoute: (route: Partial<State["route"]>) => void
}

export const useAppStore = create(immer<State>((set, get) => ({
  route: {
    name: "",
    path: "",
    forGuests: true,
    forAny: false,
    showBackButton: false,
  },
  setRoute: (_route) => set((state: State) => {
    state.route.name = _route.name ?? "";
    state.route.path = _route.path ?? state.route.path;
    state.route.forGuests = _route.forGuests ?? false;
    state.route.forAny = _route.forAny ?? false;
    state.route.showBackButton = _route.showBackButton ?? false;
  })
})))