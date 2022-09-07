import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../apis/authApi';

interface RouteProperties {
  name: string;
  forGuests: boolean;
  forAny: boolean;
  showBackButton: boolean;
  path: string;
}

export interface AppState {
  userId: number | null;
  routeProperties: RouteProperties;
}

const initialState: AppState = {
  userId: null,
  routeProperties: {
    name: "",
    path: "",
    forGuests: true,
    forAny: false,
    showBackButton: false,
  }
}

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Partial<RouteProperties>>) => {
      state.routeProperties.name = action.payload.name ?? "";
      state.routeProperties.path = action.payload.path ?? state.routeProperties.path;
      state.routeProperties.forGuests = action.payload.forGuests ?? false;
      state.routeProperties.forAny = action.payload.forAny ?? false;
      state.routeProperties.showBackButton = action.payload.showBackButton ?? false;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      console.log(action);
      
    })
  },
})

export const { setRoute } = appSlice.actions
export default appSlice.reducer