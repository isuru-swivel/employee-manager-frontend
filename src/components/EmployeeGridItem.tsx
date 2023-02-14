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
import { Employee } from "types";

interface EmployeeGridItemProps {
  employee: Employee;
}

const EmployeeGridItem = (props: EmployeeGridItemProps) => {
  return (
    <Card sx={{ minWidth: 300 }} className="mb-3">
      <CardMedia sx={{ height: 210 }} image={props.employee.photo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${props.employee.first_name} ${props.employee.last_name}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.employee.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.employee.number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.employee.gender === "M" ? "Male" : "Female"}
        </Typography>
      </CardContent>
      <CardActions className="d-flex justify-content-end">
        <Link href={`/edit/${props.employee?.id}`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EmployeeGridItem;
