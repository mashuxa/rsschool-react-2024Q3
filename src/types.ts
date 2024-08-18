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

interface Image {
  base64Picture?: string;
}

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: NonNullable<"" | "on" | undefined>;
  picture: FileList;
  country: string;
}

export type StoreFormValues = Omit<FormValues, "picture"> & Image;
