import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "features/employee/employeeSlice";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import EmployeeGridView from "components/EmployeeGridView";
import EmployeeListView from "components/EmployeeListView";
import DeleteConfirmationModal from "components/DeleteConfirmationModal";
import { deleteEmployee } from "services/employeeService";
import toast from "react-hot-toast";
import {
  confirmDelete,
  selectEmployee,
  resetDeleteConfirm,
} from "features/employee/employeeSlice";
import { Employee } from "../types";

enum ViewTypes {
  LIST_VIEW = "LIST_VIEW",
  GRID_VIEW = "GRID_VIEW",
}

const Home = () => {
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_VIEW);
  const [employeeFilter, setEmployeeFilter] = useState({
    field: "first_name",
    sort: "asc",
  });

  const {
    employees,
    loading,
    deleteConfirmation: { visible, employeeId },
  } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

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
    try {
      await deleteEmployee(employeeId);
      closeConfirm();
      dispatch(fetchEmployees({}));
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const setEmployee = (emp: Employee) => {
    dispatch(selectEmployee(emp));
  };

  const openDeleteConfirmModal = (empId: string) => {
    dispatch(confirmDelete(empId));
  };

  const closeConfirm = () => {
    dispatch(resetDeleteConfirm());
  };

  return (
    <React.Fragment>
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
      {viewType === ViewTypes.GRID_VIEW ? (
        <EmployeeGridView
          employees={employees}
          setEmployee={setEmployee}
          openDeleteConfirmModal={openDeleteConfirmModal}
        />
      ) : (
        <EmployeeListView
          employees={employees}
          setEmployee={setEmployee}
          openDeleteConfirmModal={openDeleteConfirmModal}
          setEmployeeFilter={setEmployeeFilter}
        />
      )}
      <DeleteConfirmationModal
        open={visible}
        handleSuccess={handleDeleteEmployee}
        handleClose={closeConfirm}
      />
    </React.Fragment>
  );
};

export default Home;
