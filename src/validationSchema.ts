import * as Yup from "yup";

const MAX_SIZE_BYTES = 1024 * 1024;
const VALID_TYPES = ["image/jpeg", "image/png"];

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, "Name must start with an uppercase letter")
    .required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
  acceptTerms: Yup.string()
    .oneOf(["on", ""], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  picture: Yup.mixed<FileList>()
    .test("fileSize", "File size too large", (list) => {
      if (!list?.length) return true;

      return list[0].size <= MAX_SIZE_BYTES;
    })
    .test("fileSize", "Unsupported file format", (list) => {
      if (!list?.length) return true;

      return VALID_TYPES.includes(list[0].type);
    })
    .test("fileExists", "Picture is required", (list) => {
      return !!list?.length;
    })
    .required("Required"),
  country: Yup.string().required("Country is required"),
});
