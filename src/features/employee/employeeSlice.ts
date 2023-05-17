import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
} from "@/services/employeeService";
import { IEmployeeState } from "@/types";

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
  async () => {
    const { data } = await getAllEmployees();
    return data;
  }
);

export const addNewEmployee = createAsyncThunk(
  "employee/addNewEmployee",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await addEmployee(payload);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (params: { id: string; payload: any }, { rejectWithValue }) => {
    try {
      const { data } = await editEmployee(params.id, params.payload);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteEmployeeById = createAsyncThunk(
  "employee/deleteEmployeeById",
  async (empId: string, { rejectWithValue }) => {
    try {
      await deleteEmployee(empId);
      return empId;
    } catch (e: any) {
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
    //get employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      });

    //add employee
    builder
      .addCase(addNewEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = [...state.employees, action.payload];
      })
      .addCase(addNewEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    //update employee
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const employees = state.employees.filter(
          (employee) => employee._id !== action.payload?._id
        );
        state.employees = [...employees, action.payload];
      })
      .addCase(updateEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    //delete employee
    builder
      .addCase(deleteEmployeeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(
        deleteEmployeeById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
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
