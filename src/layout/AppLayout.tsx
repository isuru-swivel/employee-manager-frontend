import { useEffect, PropsWithChildren } from "react";
import { Header } from "@/components";
import { toast } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { resetError } from "@/features/employee/employeeSlice";

const AppLayout = (props: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (!error) return;
    //if error, show the alert
    toast.error(error);

    //reset error after showing alert
    dispatch(resetError());
  }, [error]);

  return (
    <>
      <Header title={"Employee Manager"} color={"primary"} />
      <div className="container">{props.children}</div>
    </>
  );
};

export default AppLayout;
