import React from "react";
import Link from "next/link";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee } from "@/types";

interface EmployeeListViewProps {
  employees: Employee[];
  setEmployee: (emp: Employee) => void;
  openDeleteConfirmModal: (empId: string) => void;
  setEmployeeFilter: (filter: object) => void;
}

const EmployeeListView: React.FC<EmployeeListViewProps> = ({
  employees,
  setEmployee,
  openDeleteConfirmModal,
  setEmployeeFilter,
}) => {
  const columns: GridColDef[] = [
    {
      field: "photo",
      headerName: "Photo",
      width: 130,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <img
          src={
            params.row.photo ||
            `https://ui-avatars.com/api/?name=${params.row.first_name}+${params.row.last_name}`
          }
          alt=""
          width={130}
        />
      ),
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      disableColumnMenu: true,
    },
    {
      field: "number",
      headerName: "Phone",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      disableColumnMenu: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.gender === "M" ? "Male" : "Female",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 160,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="d-flex justify-content-end">
          <Link href={`/edit/${params.row?._id}`}>
            <IconButton color="primary" onClick={() => setEmployee(params.row)}>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmModal(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleSort = (sort: any) => {
    setEmployeeFilter(sort[0]);
  };

  return (
    <div style={{ height: 750, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSortModelChange={handleSort}
        rowHeight={130}
        getRowId={(row) => row._id}
        filterMode={"server"}
        sortingMode={"server"}
        sortingOrder={["asc", "desc"]}
      />
    </div>
  );
};

export default EmployeeListView;
