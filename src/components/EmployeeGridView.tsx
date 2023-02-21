import React from "react";
import EmployeeGridItem from "./EmployeeGridItem";
import { Employee } from "types";

interface EmployeeGridViewProps {
  employees: Employee[];
}

const EmployeeGridView: React.FC<EmployeeGridViewProps> = ({ employees }) => {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {employees?.map((employee: Employee) => (
        <EmployeeGridItem key={employee._id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeGridView;
