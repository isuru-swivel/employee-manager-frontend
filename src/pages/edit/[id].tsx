import { useRouter } from "next/router";
import EmployeeFormContainer from "components/EmployeeFormContainer";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <EmployeeFormContainer />
    </div>
  );
};

export default EditEmployee;
