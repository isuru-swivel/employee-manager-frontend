import axiosInstance from "@/services";

export const getAllEmployees = async () => {
  return await axiosInstance.get("/employee");
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
