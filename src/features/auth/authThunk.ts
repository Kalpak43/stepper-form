import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supbase";
import { checkAdmin } from "../../utils";

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
