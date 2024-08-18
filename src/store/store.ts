import { configureStore } from "@reduxjs/toolkit";
import countries from "./slices/countriesSlice.ts";
import reactHookForm from "./slices/reactHookFormSlice";
import uncontrolledForm from "./slices/uncontrolledFormSlice";

const store = configureStore({
  reducer: {
    reactHookForm,
    uncontrolledForm,
    countries,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
