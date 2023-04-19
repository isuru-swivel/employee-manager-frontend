import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import { PageHeader, EmployeeFormContainer } from "@/components";
import {
  updateEmployee,
  resetSelectedEmployee,
} from "@/features/employee/employeeSlice";

const EditEmployee = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router.query.id as string;

  const { selectedEmployee, error } = useAppSelector((state) => state.employee);

  useEffect(
    () => () => {
      return reset();
    },
    []
  );

  useEffect(() => {
    //redirect to list page after update
    if (error?.success) {
      router.push("/");
    }
  }, [error]);

  const reset = () => {
    //clear selected employee details
    dispatch(resetSelectedEmployee());
  };

  const handleUpdateEmployee = (payload: any) => {
    dispatch(updateEmployee({ id, payload }));
  };

  return (
    <div>
      <PageHeader title={"Edit Employee"} />
      <EmployeeFormContainer
        handleComplete={handleUpdateEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EditEmployee;
