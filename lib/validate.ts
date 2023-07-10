import { FormikErrors, FormikValues } from "formik";

type LProps = {
  email: string;
  password: string;
};

type RProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function validate_login(values: LProps) {
  const errors: FormikErrors<FormikValues> = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length <= 8 || values.password.length >= 20) {
    errors.password = "Minimum 8 or less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function validate_register(values: RProps) {
  const errors: FormikErrors<FormikValues> = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username...";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length <= 8 || values.password.length >= 20) {
    errors.password = "Must be greater than 8 or less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.password = "Password not match";
  } else if (values.confirmPassword.includes(" ")) {
    errors.password = "Invalid Confirm Password";
  }

  return errors;
}
