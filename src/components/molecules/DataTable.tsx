import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IDataTableProps {
  rows: any[];
  columns: GridColDef[];
  loading: boolean;
  pageSize?: number;
  rowsPerPage?: number;
  rowHeight?: number;
}

const DataTable: React.FC<IDataTableProps> = ({
  rows,
  columns,
  loading,
  pageSize = 5,
  rowsPerPage = 5,
  rowHeight = 52,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[rowsPerPage]}
      rowHeight={rowHeight}
      getRowId={(row) => row._id}
      loading={loading}
    />
  );
};

export default DataTable;
