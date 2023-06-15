import * as yup from "yup";
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .test(
      "empty-check",
      "name must be at least 1 characters",
      (name) => name.length > 0
    )
    .required("name required"),
  lastName: yup
    .string()
    .trim()
    .test(
      "empty-check",
      "last name must be at least 1 characters",
      (lastName) => lastName.length > 0
    )
    .required("last name required"),
  email: yup.string().email().required("email required"),
  password: yup
    .string()
    .trim()
    .test(
      "empty-check",
      "password must be at least 5 characters",
      (name) => name.length > 4
    )
    .required("password required"),
});
