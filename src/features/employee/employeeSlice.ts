import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:3001/api/employee");
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    selectEmployee: (state, action) => {
      return {
        ...state,
        selectedEmployee: action.payload,
      };
    },
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
export const { selectEmployee } = employeeSlice.actions;
