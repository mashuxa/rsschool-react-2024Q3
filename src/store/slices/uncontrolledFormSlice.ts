import createFormSlice from "../createFormSlice";

const formSlice = createFormSlice("uncontrolledForm");

export const { setValues, resetValues } = formSlice.actions;
export default formSlice.reducer;
