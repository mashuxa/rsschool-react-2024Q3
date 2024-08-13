import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../types.ts";

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
