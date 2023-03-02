import { useEffect } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import EmployeeFormContainer from "@/components/EmployeeFormContainer";
import { editEmployee } from "@/services/employeeService";
import toast from "react-hot-toast";
import { resetSelectedEmployee } from "@/features/employee/employeeSlice";

const EditEmployee = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router.query.id as string;

  const { selectedEmployee } = useAppSelector((state) => state.employee);

  useEffect(
    () => () => {
      return reset();
    },
    []
  );

  const reset = () => {
    dispatch(resetSelectedEmployee());
  };

  const updateEmployee = async (payload: any) => {
    try {
      await editEmployee(id, payload);
      await router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Head>
        <title>Edit Employee</title>
      </Head>
      <EmployeeFormContainer
        handleComplete={updateEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EditEmployee;
