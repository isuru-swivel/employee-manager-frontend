import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
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
import { IEmployee, IEmployeeState } from "@/types";

enum ViewTypes {
  LIST_VIEW = "LIST_VIEW",
  GRID_VIEW = "GRID_VIEW",
}

const Home = () => {
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_VIEW);
  const {
    loading,
    employees,
    deleteConfirmation: { visible, employeeId },
  }: IEmployeeState = useAppSelector((state) => state.employee);

  const dispatch = useAppDispatch();

  const handleViewTypeChange = () => {
    if (viewType === ViewTypes.GRID_VIEW) {
      setViewType(ViewTypes.LIST_VIEW);
    } else {
      setViewType(ViewTypes.GRID_VIEW);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeId) return;
    dispatch(deleteEmployeeById(employeeId)).then(() => {
      //close delete confirmation modal after delete
      closeConfirm();
    });
  };

  const setEmployee = (emp: IEmployee) => {
    //set employee details which need to be edited in redux store
    dispatch(selectEmployee(emp));
  };

  const openDeleteConfirmModal = (empId: string) => {
    //show delete confirmation modal
    dispatch(confirmDelete(empId));
  };

  const closeConfirm = () => {
    //close delete confirmation modal
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
          />
        );
    }
  };

  return (
    <>
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
    </>
  );
};

export default Home;
