import EmployeeGridItem from "./EmployeeGridItem";
import { Employee } from "types";

const EmployeeGridView = ({ employees }) => {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {employees.map((employee: Employee) => (
        <EmployeeGridItem key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeGridView;
