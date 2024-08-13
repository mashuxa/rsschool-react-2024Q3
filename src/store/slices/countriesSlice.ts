import { createSlice } from "@reduxjs/toolkit";
import initialState from "./countries.ts";

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
