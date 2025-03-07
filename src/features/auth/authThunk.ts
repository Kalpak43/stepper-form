import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supbase";
import { checkAdmin } from "../../utils";
import { User } from "@supabase/supabase-js";
import { setLoading } from "./authSlice";

interface AuthPayload {
  user: User | null;
  isAdmin: boolean;
}
export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      dispatch(authChanged({ user: null, isAdmin: false }));
      dispatch(setLoading(false));
      return;
    }

    // Fetch the user's role from the 'profiles' table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching user role:", profileError.message);
      dispatch(authChanged({ user, isAdmin: false }));
    } else {
      const isAdmin = profile?.role === "admin";
      dispatch(authChanged({ user, isAdmin }));
    }

    dispatch(setLoading(false));
    console.log(1);

    // Listen for future auth state changes
    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const { data: updatedProfile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        console.log(2);
        dispatch(
          authChanged({
            user: session.user,
            isAdmin: updatedProfile?.role === "admin",
          })
        );
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
      return thunkAPI.rejectWithValue(error.message);
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
