import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface IHeaderProps {
  title: string;
  color:
    | "inherit"
    | "transparent"
    | "default"
    | "primary"
    | "secondary"
    | undefined;
}

const Header: React.FC<IHeaderProps> = ({ title, color }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={color}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
