import React from "react";
import Head from "next/head";
import { IPageHeaderProps } from "@/types";

const PageHeader: React.FC<IPageHeaderProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageHeader;
