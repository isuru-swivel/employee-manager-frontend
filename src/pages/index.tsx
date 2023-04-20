import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchEmployees,
  deleteEmployeeById,
  confirmDelete,
  selectEmployee,
  resetDeleteConfirm,
} from "@/features/employee/employeeSlice";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  EmployeeGridView,
  EmployeeListView,
  ConfirmationModal,
  PageHeader,
} from "@/components";
import { IEmployee, IEmployeeState, IGetEmployees } from "@/types";

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
    error,
    deleteConfirmation: { visible, employeeId },
  }: IEmployeeState = useAppSelector((state) => state.employee);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees(employeeFilter));
  }, [employeeFilter]);

  useEffect(() => {
    //fetch employee list after delete
    if (error?.success) {
      closeConfirm();
      dispatch(fetchEmployees(employeeFilter));
    }
  }, [error]);

  const handleViewTypeChange = () => {
    if (viewType === ViewTypes.GRID_VIEW) {
      setViewType(ViewTypes.LIST_VIEW);
    } else {
      setViewType(ViewTypes.GRID_VIEW);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeId) return;
    dispatch(deleteEmployeeById(employeeId));
  };

  const setEmployee = (emp: IEmployee) => {
    dispatch(selectEmployee(emp));
  };

  const openDeleteConfirmModal = (empId: string) => {
    //show delete confirmation modal
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
      <PageHeader title={"Employee Manager"} />
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
      <ConfirmationModal
        open={visible}
        message={"Do you really want to delete this?"}
        handleSuccess={handleDeleteEmployee}
        handleClose={closeConfirm}
      />
    </div>
  );
};

export default Home;
