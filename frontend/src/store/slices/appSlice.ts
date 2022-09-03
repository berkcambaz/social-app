import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RouteProperties {
  forGuests: boolean;
  forAny: boolean;
  menuType: boolean;
  showBackButton: boolean;
}

export interface AppState extends RouteProperties {

}

const initialState: AppState = {
  forGuests: true,
  forAny: false,
  menuType: false,
  showBackButton: false,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Partial<RouteProperties>>) => {
      state.forGuests = action.payload.forGuests ?? false;
      state.forAny = action.payload.forAny ?? false;
      state.menuType = action.payload.menuType ?? false;
      state.showBackButton = action.payload.showBackButton ?? false;
    }
  }
})

export const { setRoute } = appSlice.actions
export default appSlice.reducer