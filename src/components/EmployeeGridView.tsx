import React from "react";
import EmployeeGridItem from "@/components/EmployeeGridItem";
import { Employee } from "@/types";

interface EmployeeGridViewProps {
  employees: Employee[];
  setEmployee: (emp: Employee) => void;
  openDeleteConfirmModal: (empId: string) => void;
}

const EmployeeGridView: React.FC<EmployeeGridViewProps> = ({
  employees,
  setEmployee,
  openDeleteConfirmModal,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {employees?.map((employee: Employee) => (
        <EmployeeGridItem
          key={employee._id}
          employee={employee}
          setEmployee={setEmployee}
          openDeleteConfirmModal={openDeleteConfirmModal}
        />
      ))}
    </div>
  );
};

export default EmployeeGridView;
