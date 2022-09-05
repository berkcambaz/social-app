import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./apis/authApi";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch