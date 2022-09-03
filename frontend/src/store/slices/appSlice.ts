import { createSlice } from '@reduxjs/toolkit'

export interface AppState {

}

const initialState: AppState = {

}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    set: (state) => {

    }
  }
})

export const { set } = appSlice.actions
export default appSlice.reducer