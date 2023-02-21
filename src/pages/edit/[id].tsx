import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import EmployeeFormContainer from "components/EmployeeFormContainer";
import { editEmployee } from "services/employeeService";
import toast from "react-hot-toast";
import { resetSelectedEmployee } from "features/employee/employeeSlice";

const EditEmployee = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const { selectedEmployee } = useSelector((state) => state.employee);

  useEffect(() => {
    return () => dispatch(resetSelectedEmployee());
  }, []);

  const updateEmployee = async (payload) => {
    try {
      await editEmployee(id, payload);
      await router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <EmployeeFormContainer
        handleComplete={updateEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EditEmployee;
