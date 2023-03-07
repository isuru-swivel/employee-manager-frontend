import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchEmployees } from "@/features/employee/employeeSlice";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  EmployeeGridView,
  EmployeeListView,
  DeleteConfirmationModal,
} from "@/components";
import { deleteEmployee } from "@/services/employeeService";
import toast from "react-hot-toast";
import {
  confirmDelete,
  selectEmployee,
  resetDeleteConfirm,
} from "@/features/employee/employeeSlice";
import { IEmployee, IEmployeeState, IGetEmployees } from "@/types";
import loading from "@/components/Loading";

enum ViewTypes {
  LIST_VIEW = "LIST_VIEW",
  GRID_VIEW = "GRID_VIEW",
}

const Home = () => {
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_VIEW);
  const [employeeFilter, setEmployeeFilter] = useState<IGetEmployees>({
    field: "first_name",
    sort: "asc",
  });

  const {
    loading,
    employees,
    deleteConfirmation: { visible, employeeId },
  }: IEmployeeState = useAppSelector((state) => state.employee);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees(employeeFilter));
  }, [employeeFilter]);

  const handleViewTypeChange = () => {
    if (viewType === ViewTypes.GRID_VIEW) {
      setViewType(ViewTypes.LIST_VIEW);
    } else {
      setViewType(ViewTypes.GRID_VIEW);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeId) return;
    try {
      await deleteEmployee(employeeId);
      closeConfirm();
      dispatch(fetchEmployees(employeeFilter));
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const setEmployee = (emp: IEmployee) => {
    dispatch(selectEmployee(emp));
  };

  const openDeleteConfirmModal = (empId: string) => {
    dispatch(confirmDelete(empId));
  };

  const closeConfirm = () => {
    dispatch(resetDeleteConfirm());
  };

  const getView = () => {
    switch (viewType) {
      case ViewTypes.GRID_VIEW:
        return (
          <EmployeeGridView
            loading={loading}
            employees={employees}
            setEmployee={setEmployee}
            openDeleteConfirmModal={openDeleteConfirmModal}
          />
        );
      case ViewTypes.LIST_VIEW:
        return (
          <EmployeeListView
            loading={loading}
            employees={employees}
            setEmployee={setEmployee}
            openDeleteConfirmModal={openDeleteConfirmModal}
            setEmployeeFilter={setEmployeeFilter}
          />
        );
    }
  };

  return (
    <div>
      <Head>
        <title>Employee Manager</title>
      </Head>
      <div className="d-flex justify-content-end my-4">
        <IconButton onClick={handleViewTypeChange} className="me-3">
          {viewType === ViewTypes.LIST_VIEW ? (
            <GridViewIcon />
          ) : (
            <FormatListBulletedIcon />
          )}
        </IconButton>
        <Link href="/add">
          <Button variant="contained">Add Employee</Button>
        </Link>
      </div>
      {getView()}
      <DeleteConfirmationModal
        open={visible}
        handleSuccess={handleDeleteEmployee}
        handleClose={closeConfirm}
      />
    </div>
  );
};

export default Home;
