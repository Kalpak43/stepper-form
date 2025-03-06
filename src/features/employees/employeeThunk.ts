import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supbase";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (__dirname, thunkAPI) => {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) {
      thunkAPI.rejectWithValue(error.message);
    }

    return data;
  }
);
