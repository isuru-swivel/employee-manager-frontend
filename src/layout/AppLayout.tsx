import Header from "components/Header";
import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

const AppLayout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="container">{props.children}</div>
    </>
  );
};

export default AppLayout;
