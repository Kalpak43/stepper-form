import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployees } from "./employeeThunk";

interface employeeState {
  employees: EmployeeWithId[];
  loading: boolean;
  error: string | null;
}
const initialState: employeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload as EmployeeWithId);
    },
    updateEmployee: (state, action) => {
      const { uuid, ...updatedEmployee } = action.payload;
      const index = state.employees.findIndex((emp) => emp.uuid === uuid);

      console.log(uuid, index);

      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedEmployee,
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload as EmployeeWithId[];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addEmployee, updateEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
