import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import EmployeeFormContainer from "@/components/EmployeeFormContainer";
import { addEmployee } from "@/services/employeeService";

const AddEmployee = () => {
  const router = useRouter();

  const createEmployee = async (payload: any) => {
    try {
      await addEmployee(payload);
      toast.success("Successfully added");
      await router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
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
