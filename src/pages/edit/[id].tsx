import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { PageHeader, EmployeeFormContainer } from "@/components";
import {
  updateEmployee,
  resetSelectedEmployee,
} from "@/features/employee/employeeSlice";

const EditEmployee = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router.query.id as string;

  const { selectedEmployee } = useAppSelector((state) => state.employee);

  const handleUpdateEmployee = (payload: any) => {
    dispatch(updateEmployee({ id, payload })).then(() => {
      //reset selected employee details after update
      dispatch(resetSelectedEmployee());

      //redirect to list page after update
      router.push("/");
    });
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
