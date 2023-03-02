export interface Employee {
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
  employees: Employee[] | [];
  loading: boolean;
  selectedEmployee: Employee | null;
  deleteConfirmation: {
    visible: boolean;
    employeeId: string | null;
  };
}
