import React, { SetStateAction } from "react";

export interface IEmployee {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
  _id: string;
  photo?: string;
}

export interface IGetEmployees {
  field?: string;
  sort?: string;
}

export interface IEmployeeState {
  employees: IEmployee[] | [];
  loading: boolean;
  selectedEmployee: IEmployee | null;
  deleteConfirmation: {
    visible: boolean;
    employeeId: string | null;
  };
}

export interface IEmployeeListViewProps {
  loading: boolean;
  employees: IEmployee[];
  setEmployee: (emp: IEmployee) => void;
  openDeleteConfirmModal: (empId: string) => void;
  setEmployeeFilter: React.Dispatch<SetStateAction<IGetEmployees>>;
}

export interface IEmployeeGridViewProps {
  loading: boolean;
  employees: IEmployee[];
  setEmployee: (emp: IEmployee) => void;
  openDeleteConfirmModal: (empId: string) => void;
}

export interface IEmployeeGridItemProps {
  employee: IEmployee;
  setEmployee: (emp: IEmployee) => void;
  openDeleteConfirmModal: (empId: string) => void;
}
