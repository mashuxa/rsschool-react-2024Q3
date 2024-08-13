export enum FormFields {
  Name = "name",
  Age = "age",
  Email = "email",
  Gender = "gender",
  Password = "password",
  ConfirmPassword = "confirmPassword",
  AcceptTerms = "acceptTerms",
  Picture = "picture",
  Country = "country",
}

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
}
