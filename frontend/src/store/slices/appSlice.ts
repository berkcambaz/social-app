import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RouteProperties {
  name: string;
  forGuests: boolean;
  forAny: boolean;
  menuType: boolean;
  showBackButton: boolean;
  routeBeforeMenu: string | null;
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
    routeBeforeMenu: null,
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
      state.routeProperties.routeBeforeMenu = action.payload.routeBeforeMenu ?? state.routeProperties.routeBeforeMenu;
    }
  }
})

export const { setRoute } = appSlice.actions
export default appSlice.reducer