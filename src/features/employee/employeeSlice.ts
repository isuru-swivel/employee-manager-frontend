import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getAllEmployees,
  addEmployee,
  deleteEmployee,
  editEmployee,
} from "@/services/employeeService";
import { IGetEmployees, IEmployeeState } from "@/types";

const initialState: IEmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
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

export const addNewEmployee = createAsyncThunk(
  "employee/addNewEmployee",
  async (payload: any, { rejectWithValue }) => {
    try {
      return await addEmployee(payload);
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (params: { id: string; payload: any }, { rejectWithValue }) => {
    try {
      return await editEmployee(params.id, params.payload);
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteEmployeeById = createAsyncThunk(
  "employee/deleteEmployeeById",
  async (empId: string, { rejectWithValue }) => {
    try {
      return await deleteEmployee(empId);
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    selectEmployee: (state, action: PayloadAction<any>) => ({
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
    resetError: (state) => ({
      ...state,
      error: null,
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
    builder.addCase(fetchEmployees.rejected, (state) => {
      state.loading = false;
      state.employees = [];
    });

    builder.addCase(addNewEmployee.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(
      addNewEmployee.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = { success: false, message: action.payload };
      }
    );

    builder.addCase(updateEmployee.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(
      updateEmployee.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = { success: false, message: action.payload };
      }
    );

    builder.addCase(deleteEmployeeById.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(
      deleteEmployeeById.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = { success: false, message: action.payload };
      }
    );
  },
});

export default employeeSlice.reducer;
export const {
  selectEmployee,
  resetSelectedEmployee,
  confirmDelete,
  resetDeleteConfirm,
  resetError,
} = employeeSlice.actions;
