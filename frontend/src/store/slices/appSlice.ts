import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RouteProperties {
  name: string;
  forGuests: boolean;
  forAny: boolean;
  menuType: boolean;
  showBackButton: boolean;
}

export interface AppState {
  routeProperties: RouteProperties;
}

const initialState: AppState = {
  routeProperties: {
    name: "",
    forGuests: true,
    forAny: false,
    menuType: false,
    showBackButton: false,
  }
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Partial<RouteProperties>>) => {
      state.routeProperties.name = action.payload.name ?? "";
      state.routeProperties.forGuests = action.payload.forGuests ?? false;
      state.routeProperties.forAny = action.payload.forAny ?? false;
      state.routeProperties.menuType = action.payload.menuType ?? false;
      state.routeProperties.showBackButton = action.payload.showBackButton ?? false;
    }
  }
})

export const { setRoute } = appSlice.actions
export default appSlice.reducer