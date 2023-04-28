import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData, ifAuthThenRenew, login } from "../../api/auth";
import { RootState } from "../../store";
import $http from '../../api/http';

interface State {
  isAuthenticated: boolean,
  isLoading: boolean,
  error: any,
  user: LoginData|null
}
const initialState: State = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null
};

export const loginAsync = createAsyncThunk("users/login", async (email: string) => {
    return await login(email);
});

export const ifAuthThenRenewThunk = createAsyncThunk("users/if-auth-then-renew", async () => {
  return await ifAuthThenRenew();
});

const loginSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      logout: state => {
        state.isAuthenticated = false;
        state.error = null;
      },
    },
    extraReducers: builder => {
      builder
        .addCase(loginAsync.pending, state => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
          state.user = action.payload;
          $http.setIdentity(state.user);
        })
        .addCase(loginAsync.rejected, (state, action) => {
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = action.payload;
          $http.clearIdentity();
        })
        .addCase(ifAuthThenRenewThunk.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
          state.user = action.payload;
          $http.setIdentity(state.user);
        })
        .addCase(ifAuthThenRenewThunk.rejected, (state) => {
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = null;
          state.user = null;
          $http.clearIdentity();
        })

    },
});

export const { logout } = loginSlice.actions;
export const selectIsLoggedin = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export default loginSlice.reducer;
