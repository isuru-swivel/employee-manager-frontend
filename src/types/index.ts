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
  error: IError | null;
  selectedEmployee: IEmployee | null;
  deleteConfirmation: IDeleteConfirmation;
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

interface IDeleteConfirmation {
  visible: boolean;
  employeeId: string | null;
}

interface IError {
  success: boolean;
  message: string;
}

export interface IEmployeeFormContainerProps {
  employee?: IEmployee | null;
  handleComplete: (payload: any) => void;
}

export interface IPageHeaderProps {
  title: string;
}
