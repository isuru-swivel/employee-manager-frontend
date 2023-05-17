import React from "react";
import { EmployeeGridItem, Loading } from "@/components";
import { IEmployeeGridViewProps, IEmployee } from "@/types";

const EmployeeGridView: React.FC<IEmployeeGridViewProps> = ({
  loading,
  employees,
  setEmployee,
  openDeleteConfirmModal,
}) => {
  if (loading) return <Loading />;

  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {employees?.map((employee: IEmployee) => (
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
