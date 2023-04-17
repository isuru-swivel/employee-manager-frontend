import { useEffect } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import EmployeeFormContainer from "@/components/EmployeeFormContainer";
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
    if (error?.success) {
      router.push("/");
    }
  }, [error]);

  const reset = () => {
    dispatch(resetSelectedEmployee());
  };

  const handleUpdateEmployee = (payload: any) => {
    dispatch(updateEmployee({ id, payload }));
  };

  return (
    <div>
      <Head>
        <title>Edit Employee</title>
      </Head>
      <EmployeeFormContainer
        handleComplete={handleUpdateEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EditEmployee;
