import React, { useEffect } from "react";
import Link from "next/link";
import {
  FormControl,
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  validateEmail,
  validatePhoneNumber,
  validateEnglishLetters,
} from "utils/validations";
import { Employee } from "types";

const schema = yup.object({
  first_name: yup
    .string()
    .required()
    .test("validate first name", "Invalid characters", (value) =>
      validateEnglishLetters(value)
    )
    .min(6)
    .max(10)
    .label("First Name"),
  last_name: yup
    .string()
    .required()
    .test("validate last name", "Invalid characters", (value) =>
      validateEnglishLetters(value)
    )
    .min(6)
    .max(10)
    .label("Last Name"),
  email: yup
    .string()
    .test("validate email", "Invalid Email Address", (value) => {
      if (!value) return true;
      return validateEmail(value);
    }),
  phone: yup
    .string()
    .test("validate phone number", "Invalid phone number", (value) => {
      if (!value) return true;
      return validatePhoneNumber(value);
    }),
  gender: yup.string(),
});

interface EmployeeFormContainerProps {
  employee?: Employee;
  handleComplete: (payload: any) => void;
}

const EmployeeFormContainer: React.FC<EmployeeFormContainerProps> = ({
  employee,
  handleComplete,
}) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (employee) {
      setValue("first_name", employee.first_name);
      setValue("last_name", employee.last_name);
      setValue("email", employee.email);
      setValue("number", employee.number);
      setValue("gender", { id: employee.gender, name: employee.gender });
    }
  }, [employee]);

  const onSubmit = (data: any) => {
    if (isDirty) handleComplete(data);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-end">
        <Link href="/">
          <Button variant="contained">List View</Button>
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  label="First Name"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  {...register("first_name", { required: true })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  label="Last Name"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  {...register("last_name", { required: true })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...register("number")}
                />
              </FormControl>
              <FormControl fullWidth className="mt-3">
                <InputLabel>Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="gender"
                      id="gender"
                      label="Gender"
                      {...field}
                    >
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"F"}>F</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeFormContainer;
