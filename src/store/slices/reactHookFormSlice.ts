import createFormSlice from "../createFormSlice";

const formSlice = createFormSlice("reactHookForm");

export const { setValues, resetValues } = formSlice.actions;
export default formSlice.reducer;
