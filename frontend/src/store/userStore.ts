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
  getFollowers: (user: IUser | null) => IUser[];
  getFollowings: (user: IUser | null) => IUser[];

  auth: () => Promise<void>;
  signup: (usertag: string, email: string, password: string) => Promise<void>;
  login: (usertag: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  followUser: (user: IUser) => Promise<void>;
  editUser: (username: string, bio: string) => Promise<void>;

  fetchUserById: (userId: number) => Promise<void>;
  fetchUserByTag: (usertag: string) => Promise<void>;
  fetchUserFollowers: (user: IUser, type: "newer" | "older", refresh?: boolean) => Promise<void>;
  fetchUserFollowings: (user: IUser, type: "newer" | "older", refresh?: boolean) => Promise<void>;
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

  getFollowers: (user) => {
    const state = get();

    if (!user) return [];

    const followersArray = state.followers[user.id];
    if (!followersArray) return [];

    const followers: IUser[] = [];
    followersArray.forEach(id => {
      const follower = state.entities[id];
      if (follower) followers.push(follower);
    })

    return followers;
  },

  getFollowings: (user) => {
    const state = get();

    if (!user) return [];

    const followingsArray = state.followings[user.id];
    if (!followingsArray) return [];

    const followings: IUser[] = [];
    followingsArray.forEach(id => {
      const following = state.entities[id];
      if (following) followings.push(following);
    })

    return followings;
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
      const target = state.entities[user.id];
      if (!target) return;

      target.following = followed;
      target.followerCount += followed ? +1 : -1;

      const currentUser = state.entities[state.current!];
      if (!currentUser) return;
      currentUser.followingCount += data.state ? +1 : -1;
    })
  },

  editUser: async (username, bio) => {
    const { err } = await api.editUser(username, bio);
    if (err) return;

    set((state: State) => {
      if (state.current === null) return;
      const user = state.entities[state.current];
      if (!user) return;
      user.name = username.trim();
      user.bio = bio.trim();
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

  fetchUserFollowers: async (user, type, refresh) => {
    const state = get();

    const { data, err } = await api.getUserFollowers(user.id, getAnchor(state.followers[user.id], type, refresh), type);
    if (err || data.users === undefined || data.users.length === 0) return;

    const users = data.users;
    set((state: State) => {
      if (!state.followers[user.id]) state.followers[user.id] = [];
      let followers = state.followers[user.id] as number[];

      users.forEach((user) => {
        if (!state.entities[user.id]) state.ids.push(user.id);
        state.entities[user.id] = user;
        followers.push(user.id);
      })

      followers = sortArray(followers);
    })
  },

  fetchUserFollowings: async (user, type, refresh) => {
    const state = get();

    const { data, err } = await api.getUserFollowings(user.id, getAnchor(state.followings[user.id], type, refresh), type);
    if (err || data.users === undefined || data.users.length === 0) return;

    const users = data.users;
    set((state: State) => {
      if (!state.followings[user.id]) state.followings[user.id] = [];
      let followings = state.followings[user.id] as number[];

      users.forEach((user) => {
        if (!state.entities[user.id]) state.ids.push(user.id);
        state.entities[user.id] = user;
        followings.push(user.id);
      })

      followings = sortArray(followings);
    })
  },
})))

function getAnchor(arr: number[] | undefined, type: "newer" | "older", refresh?: boolean): number {
  if (!arr || arr.length === 0 || refresh) return -1;
  const out = type === "newer" ? arr[0] : arr[arr.length - 1];
  return out === undefined ? -1 : out;
}

function sortArray(arr: number[]) {
  // Convert array -> set -> array in order to remove duplicates
  return [... new Set(arr)].sort((a, b) => (b - a));
}