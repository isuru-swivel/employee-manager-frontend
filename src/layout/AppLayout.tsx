import { useEffect } from "react";
import { Header } from "@/components";
import type { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { resetError } from "@/features/employee/employeeSlice";

export interface ILayoutProps {
  children: ReactNode;
}

const AppLayout = (props: ILayoutProps) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (!error) return;

    if (error.success) {
      toast.success(error.message);
    } else {
      toast.error(error.message);
    }

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
