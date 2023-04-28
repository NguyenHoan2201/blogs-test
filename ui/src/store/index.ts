import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import loginSlice from '../features/auth/auth.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import blogsSlice from "../features/blogs/blogs.slice";
export const store = configureStore({
  reducer: {
      auth: loginSlice,
      blog: blogsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
