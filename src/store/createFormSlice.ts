import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreFormValues } from "../types.ts";

const initialFormState: StoreFormValues = {
  acceptTerms: "",
  name: "",
  age: 0,
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  country: "",
  base64Picture: "",
};

const createFormSlice = (name: string) => {
  return createSlice({
    name,
    initialState: initialFormState,
    reducers: {
      setValues(state, action: PayloadAction<Partial<StoreFormValues>>) {
        return { ...state, ...action.payload };
      },
      resetValues() {
        return initialFormState;
      },
    },
  });
};

export default createFormSlice;
