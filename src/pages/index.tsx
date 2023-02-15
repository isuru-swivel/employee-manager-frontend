import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import { getEmployees } from "store/thunks";
import { RootState } from "store/store";
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

  const dispatch = useAppDispatch();
  const employees = useAppSelector(
    (state: RootState) => state.employee.employees
  );

  useEffect(() => {
    dispatch(getEmployees());
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
