import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialFormState: FormValues = {
  name: "",
  age: 0,
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  acceptTerms: false,
  picture: "",
  country: "",
};

const createFormSlice = (name: string) => {
  return createSlice({
    name,
    initialState: initialFormState,
    reducers: {
      setValues(state, action: PayloadAction<Partial<FormValues>>) {
        return { ...state, ...action.payload };
      },
      resetValues() {
        return initialFormState;
      },
    },
  });
};

export default createFormSlice;
