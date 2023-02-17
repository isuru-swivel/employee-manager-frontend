import EmployeeGridItem from "./EmployeeGridItem";
import { Employee } from "types";

interface EmployeeGridViewProps {
  employees: Employee[];
}

const EmployeeGridView = (props: EmployeeGridViewProps) => {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {props.employees?.map((employee: Employee) => (
        <EmployeeGridItem key={employee._id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeGridView;
