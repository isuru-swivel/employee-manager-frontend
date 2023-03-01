import axiosInstance from "@/services";
import { IGetEmployees } from "@/types";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const getAllEmployees = async ({ field, sort }: IGetEmployees) => {
  return await axiosInstance.get(`/employee?field=${field}&&sort=${sort}`);
};

export const addEmployee = async (payload: any) => {
  return await axiosInstance.post("/employee", payload, config);
};

export const editEmployee = async (empId: string, payload: any) => {
  return await axiosInstance.put(`/employee/${empId}`, payload, config);
};

export const deleteEmployee = async (empId: string) => {
  return await axiosInstance.delete(`/employee/${empId}`, config);
};
