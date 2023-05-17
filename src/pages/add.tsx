import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks";
import { EmployeeFormContainer, PageHeader } from "@/components";
import { addNewEmployee } from "@/features/employee/employeeSlice";

const AddEmployee = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const createEmployee = (payload: any) => {
    dispatch(addNewEmployee(payload)).then(() => {
      //redirect to list page after adding new employee
      router.push("/");
    });
  };

  return (
    <>
      <PageHeader title={"Add Employee"} />
      <EmployeeFormContainer handleComplete={createEmployee} />
    </>
  );
};

export default AddEmployee;
