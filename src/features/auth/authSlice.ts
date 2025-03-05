import { createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { login } from "./authThunk";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default authSlice.reducer;
