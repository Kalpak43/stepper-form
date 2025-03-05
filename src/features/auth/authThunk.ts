import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supbase";
import { checkAdmin } from "../../utils";
import { User } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { setLoading } from "./authSlice";

interface AuthPayload {
  user: User | null;
  isAdmin: boolean;
}
export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const user = session.user;

        // Example logic to check if the user is an admin (adjust as needed)
        //   @ts-ignore
        const isAdmin = jwtDecode(session.access_token).role === "admin";

        dispatch(authChanged({ user, isAdmin }));
        dispatch(setLoading(false));
      } else {
        dispatch(authChanged({ user: null, isAdmin: false }));
        dispatch(setLoading(false));
      }
    });
  }
);

export const authChanged = (payload: AuthPayload) => ({
  type: "auth/authChanged",
  payload,
});

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      thunkAPI.rejectWithValue(error.message);
    }

    const { user } = data;
    const isAdmin = await checkAdmin();

    return {
      user,
      isAdmin,
    };
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    thunkAPI.rejectWithValue(error.message);
  }

  return {
    user: null,
    isAdmin: false,
  };
});
