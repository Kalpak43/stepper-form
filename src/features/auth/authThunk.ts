import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supbase";
import { checkAdmin } from "../../utils";
import { User } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";

interface AuthPayload {
  user: User | null;
  isAdmin: boolean;
}

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

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const user = session.user;

        // Example logic to check if the user is an admin (adjust as needed)
        //   @ts-ignore
        const isAdmin = jwtDecode(session.access_token).role === "admin";

        console.log(user, isAdmin);

        dispatch(authChanged({ user, isAdmin }));
      } else {
        dispatch(authChanged({ user: null, isAdmin: false }));
      }
    });
  }
);

export const authChanged = (payload: AuthPayload) => ({
  type: "auth/authChanged",
  payload,
});
