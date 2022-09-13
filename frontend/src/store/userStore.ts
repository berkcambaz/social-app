import create from "zustand"
import { immer } from 'zustand/middleware/immer'
import { IUser } from "../../../shared/types";
import api from "./api";

interface State {
  current: number | null;

  pendingIds: { [key: number]: boolean };
  pendingTags: { [key: string]: boolean };

  entities: { [key: number]: IUser };
  ids: number[];

  followers: { [key: number]: number[] };
  followings: { [key: number]: number[] };

  getCurrentUser: () => IUser | null;
  getUserById: (id: number | null) => IUser | null;
  getUserByTag: (tag: string | undefined) => IUser | null;

  auth: () => Promise<void>;
  signup: (usertag: string, email: string, password: string) => Promise<void>;
  login: (usertag: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  followUser: (user: IUser) => Promise<void>;
  fetchUserById: (userId: number) => Promise<void>;
  fetchUserByTag: (usertag: string) => Promise<void>;
}

export const useUserStore = create(immer<State>((set, get) => ({
  current: null,

  pendingIds: {},
  pendingTags: {},

  entities: {},
  ids: [],

  followers: {},
  followings: {},

  getCurrentUser: () => {
    const state = get();

    if (state.current === null) return null;
    const user = state.entities[state.current];
    return user ? user : null;
  },

  getUserById: (id) => {
    const state = get();

    if (id === null) return null;
    const user = state.entities[id];
    return user ? user : null;
  },

  getUserByTag: (tag) => {
    const state = get();

    if (tag === undefined) return null;

    for (const key in state.entities) {
      const user = state.entities[key];
      if (!user) continue;
      if (user.tag === tag) return user;
    }

    return null;
  },

  auth: async () => {
    const state = get();

    if (state.current !== null) return;

    const { data, err } = await api.auth();
    if (err || data.userId === undefined) return;

    const userId = data.userId;
    set((state: State) => void (state.current = userId))
  },

  signup: async (usertag, email, password) => {
    const { data, err } = await api.signup(usertag, email, password);
    if (err || data.userId === undefined) return;

    const userId = data.userId;
    set((state: State) => void (state.current = userId))
  },

  login: async (usertag, password) => {
    const { data, err } = await api.login(usertag, password);
    if (err || data.userId === undefined) return;

    const userId = data.userId;
    set((state: State) => void (state.current = userId))
  },

  logout: async () => {
    const { err } = await api.logout();
    if (err) return;

    set((state: State) => void (state.current = null))
  },

  followUser: async (user) => {
    const { data, err } = await api.followUser(user.id);
    if (err || data.state === undefined) return;

    const followed = data.state;
    set((state: State) => {
      user.following = followed;
      user.followerCount += followed ? +1 : -1;

      const currentUser = state.getCurrentUser();
      if (!currentUser) return;
      currentUser.followingCount += data.state ? +1 : -1;
    })
  },

  fetchUserById: async (userId) => {
    const state = get();

    if (state.pendingIds[userId]) return;
    set((state: State) => void (state.pendingIds[userId] = true))

    const { data, err } = await api.getUserById(userId);

    set((state: State) => void (delete state.pendingIds[userId]))

    if (err || data.user === undefined) return;

    const user = data.user;
    set((state: State) => {
      if (!state.entities[user.id]) state.ids.push(user.id);
      state.entities[user.id] = user;
    });
  },

  fetchUserByTag: async (usertag) => {
    const state = get();

    if (state.pendingTags[usertag]) return;
    set((state: State) => void (state.pendingTags[usertag] = true))

    const { data, err } = await api.getUserByTag(usertag);

    set((state: State) => void (delete state.pendingTags[usertag]))

    if (err || data.user === undefined) return;

    const user = data.user;
    set((state: State) => {
      if (!state.entities[user.id]) state.ids.push(user.id);
      state.entities[user.id] = user;
    });
  },
})))