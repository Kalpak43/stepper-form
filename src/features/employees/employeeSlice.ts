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
