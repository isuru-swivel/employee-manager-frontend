import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
