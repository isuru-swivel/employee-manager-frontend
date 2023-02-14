import Link from "next/link";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const ColumnHeader = (headerName: string) => (
  <div>
    <span>{headerName}</span>
    <span>
      <IconButton>
        <SearchIcon />
      </IconButton>
    </span>
  </div>
);

const columns: GridColDef[] = [
  {
    field: "photo",
    headerName: "Photo",
    width: 130,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => <img src={params.row.photo} alt="" />,
  },
  {
    field: "first_name",
    headerName: "First name",
    width: 160,
    disableColumnMenu: true,
    renderHeader: (params) => ColumnHeader("First name"),
  },
  { field: "last_name", headerName: "Last name", width: 160 },
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
    width: 90,
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
        <Link href={`/edit/${params.row?.id}`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

const handleSort = (sort) => {};

const EmployeeListView = ({ employees }) => {
  return (
    <div style={{ height: 750, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSortModelChange={handleSort}
        rowHeight={130}
      />
    </div>
  );
};

export default EmployeeListView;
