import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IDataTableProps {
  rows: any[];
  columns: GridColDef[];
  loading: boolean;
  handleSort: (sort: any) => void;
}

const DataTable: React.FC<IDataTableProps> = ({
  rows,
  columns,
  handleSort,
  loading,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      onSortModelChange={handleSort}
      rowHeight={130}
      getRowId={(row) => row._id}
      filterMode={"server"}
      sortingMode={"server"}
      sortingOrder={["asc", "desc"]}
      loading={loading}
    />
  );
};

export default DataTable;
