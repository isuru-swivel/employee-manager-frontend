import axiosInstance from "./index";
import { IGetEmployees } from "types";

export const getAllEmployees = async ({ field, sort }: IGetEmployees) => {
  return await axiosInstance.get(`/employee?field=${field}&&sort=${sort}`);
};

export const addEmployee = async (payload: any) => {
  return await axiosInstance.post("/employee", payload);
};

export const editEmployee = async (empId: string, payload: any) => {
  return await axiosInstance.put(`/employee/${empId}`, payload);
};

export const deleteEmployee = async (empId: string) => {
  return await axiosInstance.delete(`/employee/${empId}`);
};
