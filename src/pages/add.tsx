import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { EmployeeFormContainer, PageHeader } from "@/components";
import { addNewEmployee } from "@/features/employee/employeeSlice";

const AddEmployee = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.employee);

  useEffect(() => {
    //redirect to list page after adding a new employee
    if (error?.success) {
      router.push("/");
    }
  }, [error]);

  const createEmployee = (payload: any) => {
    dispatch(addNewEmployee(payload));
  };

  return (
    <div>
      <PageHeader title={"Add Employee"} />
      <EmployeeFormContainer handleComplete={createEmployee} />
    </div>
  );
};

export default AddEmployee;
