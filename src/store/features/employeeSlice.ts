import { createSlice } from "@reduxjs/toolkit";
import { getEmployees } from "../thunks";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getEmployees.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getEmployees.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.employees = payload;
    },
    [getEmployees.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default employeeSlice;
