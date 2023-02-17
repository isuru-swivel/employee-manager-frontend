import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "features/employee/employeeSlice";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import EmployeeGridView from "components/EmployeeGridView";
import EmployeeListView from "components/EmployeeListView";

enum ViewTypes {
  LIST_VIEW = "LIST_VIEW",
  GRID_VIEW = "GRID_VIEW",
}

const Home = () => {
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_VIEW);
  const { employees, loading } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const handleViewTypeChange = () => {
    if (viewType === ViewTypes.GRID_VIEW) {
      setViewType(ViewTypes.LIST_VIEW);
    } else {
      setViewType(ViewTypes.GRID_VIEW);
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-end my-4">
        <IconButton onClick={handleViewTypeChange} className="me-3">
          {viewType === ViewTypes.GRID_VIEW ? (
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
        <EmployeeGridView employees={employees} />
      ) : (
        <EmployeeListView employees={employees} />
      )}
    </React.Fragment>
  );
};

export default Home;
