import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "@/redux/slices/user.slice";

const rootReducer = combineReducers({
  user,
  // [apiSlice.reducerPath]: apiSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
