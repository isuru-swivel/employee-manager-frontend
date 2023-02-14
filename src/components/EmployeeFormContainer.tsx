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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  validateEmail,
  validatePhoneNumber,
  validateEnglishLetters,
} from "utils/validations";

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

const EmployeeFormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {};

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
                  {...register("phone")}
                />
              </FormControl>
              <FormControl fullWidth className="mt-3">
                <InputLabel>Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  label="Gender"
                  {...register("gender")}
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                </Select>
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
