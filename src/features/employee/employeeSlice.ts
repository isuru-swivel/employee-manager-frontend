import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEmployees } from "@/services/employeeService";
import { IGetEmployees } from "@/types";

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  deleteConfirmation: {
    visible: false,
    employeeId: null,
  },
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (filters: IGetEmployees) => {
    const response = await getAllEmployees(filters);
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    selectEmployee: (state, action) => ({
      ...state,
      selectedEmployee: action.payload,
    }),
    resetSelectedEmployee: (state) => ({
      ...state,
      selectedEmployee: null,
    }),
    confirmDelete: (state, action) => ({
      ...state,
      deleteConfirmation: {
        visible: true,
        employeeId: action.payload,
      },
    }),
    resetDeleteConfirm: (state) => ({
      ...state,
      deleteConfirmation: {
        visible: false,
        employeeId: null,
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.employees = [];
    });
  },
});

export default employeeSlice.reducer;
export const {
  selectEmployee,
  resetSelectedEmployee,
  confirmDelete,
  resetDeleteConfirm,
} = employeeSlice.actions;
