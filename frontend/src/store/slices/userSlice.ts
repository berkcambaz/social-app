import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { useMemo } from 'react';
import { IPost, IUser } from '../../../../shared/types';
import { userApi } from '../apis/userApi';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

const usersAdapter = createEntityAdapter<IUser>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => (b.id - a.id),
})

export interface UserState {
  users: EntityState<IUser>;
  followers: { [key: number]: number[] };
  followings: { [key: number]: number[] };
}

const initialState: UserState = {
  users: usersAdapter.getInitialState(),
  followers: {},
  followings: {}
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(userApi.endpoints.followUser.matchFulfilled,
        (state, action) => {
          const userId = action.meta.arg.originalArgs.userId;
          const following = action.payload.state as boolean;
          usersAdapter.updateOne(state.users, { id: userId, changes: { following } });
        })
      .addMatcher(userApi.endpoints.getUserById.matchFulfilled,
        (state, { payload }: { payload: { user: IUser } }) => {
          usersAdapter.setOne(state.users, payload.user);
        })
      .addMatcher(userApi.endpoints.getUserByTag.matchFulfilled,
        (state, { payload }: { payload: { user: IUser } }) => {
          usersAdapter.setOne(state.users, payload.user);
        })
      .addMatcher(userApi.endpoints.getUserFollowers.matchFulfilled,
        (state, action) => {
          const userId = action.meta.arg.originalArgs.userId;
          const users: IUser[] = action.payload.users;
          if (!state.followers[userId]) state.followers[userId] = [];
          users.forEach((user) => state.followers[userId].push(user.id));

          state.followers[userId] = sortArray(state.followers[userId]);

          usersAdapter.setMany(state.users, users);
        })
      .addMatcher(userApi.endpoints.getUserFollowings.matchFulfilled,
        (state, action) => {
          const userId = action.meta.arg.originalArgs.userId;
          const users: IUser[] = action.payload.users;
          if (!state.followings[userId]) state.followings[userId] = [];
          users.forEach((user) => state.followings[userId].push(user.id));

          state.followings[userId] = sortArray(state.followings[userId]);

          usersAdapter.setMany(state.users, users);
        })
  },
})

function sortArray(arr: number[]) {
  return [...new Set(arr)];
}

export const { } = userSlice.actions
export default userSlice.reducer

export const {
  selectById: selectUserById,
  selectAll: selectAllUserIds,
  selectEntities: selectAllUserEntities
} = usersAdapter.getSelectors((state: RootState) => state.user.users)

export const selectAllFollowers = (state: RootState) => state.user.followers
export const selectAllFollowings = (state: RootState) => state.user.followings

export const useUserById = (id: number) => {

}

export const useUserByTag = (tag: string | undefined) => {
  const allUsers = useAppSelector(selectAllUserIds);

  const user = useMemo(() => {
    for (let i = 0; i < allUsers.length; ++i)
      if (allUsers[i].tag === tag)
        return allUsers[i];

    return undefined;
  }, [allUsers, tag])

  return user;
}

export const useUserFollowers = (user: IUser | undefined) => {
  const userEntities = useAppSelector(selectAllUserEntities);
  const allFollowers = useAppSelector(selectAllFollowers);

  const followers = useMemo(() => {
    if (!user || !allFollowers[user.id]) return [];

    const out: IUser[] = [];

    for (let i = 0; i < allFollowers[user.id].length; ++i) {
      const follower = userEntities[allFollowers[user.id][i]];
      if (follower) out.push(follower);
    }

    return out;
  }, [ allFollowers])

  return followers;
}

export const useUserFollowings = (user: IUser | undefined) => {
  const userEntities = useAppSelector(selectAllUserEntities);
  const allFollowings = useAppSelector(selectAllFollowings);

  const followings = useMemo(() => {
    if (!user || !allFollowings[user.id]) return [];

    const out: IUser[] = [];

    for (let i = 0; i < allFollowings[user.id].length; ++i) {
      const follower = userEntities[allFollowings[user.id][i]];
      if (follower) out.push(follower);
    }

    return out;
  }, [allFollowings])

  return followings;
}