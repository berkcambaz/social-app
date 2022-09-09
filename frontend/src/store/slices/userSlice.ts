import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { IUser } from '../../../../shared/types';
import { userApi } from '../apis/userApi';
import { RootState } from '../store';

const usersAdapter = createEntityAdapter<IUser>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => (b.id - a.id),
})

export interface UserState {
  users: EntityState<IUser>;
}

const initialState: UserState = {
  users: usersAdapter.getInitialState(),
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(userApi.endpoints.getUserById.matchFulfilled,
        (state, { payload }: { payload: { user: IUser } }) => {
          usersAdapter.setOne(state.users, payload.user);
        })
  },
})

export const { } = userSlice.actions
export default userSlice.reducer

export const {
  selectById: selectUserById
} = usersAdapter.getSelectors((state: RootState) => state.user.users)