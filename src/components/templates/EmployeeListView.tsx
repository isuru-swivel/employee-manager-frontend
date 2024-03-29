import React from "react";
import Link from "next/link";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DataTable } from "@/components";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IEmployeeListViewProps } from "@/types";
import { getAvatarUrl } from "@/utils/helpers";

const EmployeeListView: React.FC<IEmployeeListViewProps> = ({
  loading,
  employees,
  setEmployee,
  openDeleteConfirmModal,
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
            getAvatarUrl(params.row.first_name, params.row.last_name)
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
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 160,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "number",
      headerName: "Phone",
      width: 130,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      sortable: false,
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

  return (
    <div style={{ height: 750, width: "100%" }}>
      <DataTable
        loading={loading}
        columns={columns}
        rows={employees}
        rowHeight={130}
      />
    </div>
  );
};

export default EmployeeListView;
