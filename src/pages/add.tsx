import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import EmployeeFormContainer from "@/components/EmployeeFormContainer";
import { addNewEmployee } from "@/features/employee/employeeSlice";

const AddEmployee = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (error?.success) {
      router.push("/");
    }
  }, [error]);

  const createEmployee = (payload: any) => {
    dispatch(addNewEmployee(payload));
  };

  return (
    <div>
      <Head>
        <title>Add Employee</title>
      </Head>
      <EmployeeFormContainer handleComplete={createEmployee} />
    </div>
  );
};

export default AddEmployee;
