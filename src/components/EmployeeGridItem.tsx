import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee } from "@/types";

interface EmployeeGridItemProps {
  employee: Employee;
  setEmployee: (emp: Employee) => void;
  openDeleteConfirmModal: (empId: string) => void;
}

const EmployeeGridItem: React.FC<EmployeeGridItemProps> = ({
  employee,
  setEmployee,
  openDeleteConfirmModal,
}) => {
  return (
    <Card sx={{ minWidth: 300 }} className="mb-3">
      <CardMedia
        sx={{ height: 210 }}
        image={
          employee.photo ||
          `https://ui-avatars.com/api/?name=${employee.first_name}+${employee.last_name}`
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${employee.first_name} ${employee.last_name}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.gender === "M" ? "Male" : "Female"}
        </Typography>
      </CardContent>
      <CardActions className="d-flex justify-content-end">
        <Link href={`/edit/${employee?._id}`}>
          <IconButton color="primary" onClick={() => setEmployee(employee)}>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          color="error"
          onClick={() => openDeleteConfirmModal(employee._id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EmployeeGridItem;
