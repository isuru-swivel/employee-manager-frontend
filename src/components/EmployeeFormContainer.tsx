import React from "react";
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
  number: yup
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
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: employee?.first_name,
      last_name: employee?.last_name,
      email: employee?.email,
      number: employee?.number,
      gender: employee?.gender,
    },
  });

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
              <FormControl fullWidth variant="standard" className="mb-3">
                <TextField
                  label="First Name"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  {...register("first_name", { required: true })}
                />
              </FormControl>
              <FormControl fullWidth variant="standard" className="mb-3">
                <TextField
                  label="Last Name"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  {...register("last_name", { required: true })}
                />
              </FormControl>
              <FormControl fullWidth variant="standard" className="mb-3">
                <TextField
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
              </FormControl>
              <FormControl fullWidth variant="standard" className="mb-3">
                <TextField
                  label="Phone"
                  error={!!errors.number}
                  helperText={errors.number?.message}
                  {...register("number")}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select label="Gender" {...field}>
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
