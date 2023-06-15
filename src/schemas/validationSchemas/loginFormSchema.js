import * as yup from "yup";
export const loginSchema = yup.object().shape({
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
