import { createSlice, SerializedError } from '@reduxjs/toolkit';
import api from '../api/api.ts';
import { FetchDataType, Person } from '../types.ts';

interface CurrentPageType extends FetchDataType<Person> {
  isLoading: boolean;
  error: SerializedError | null;
}

export interface PersonsState {
  currentPage: CurrentPageType;
}

const initialState: PersonsState = {
  currentPage: {
    results: [],
    count: 0,
    previous: '',
    next: '',
    isLoading: false,
    error: null,
  },
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getPersons.matchPending, (state) => {
        state.currentPage.isLoading = true;
        state.currentPage.error = null;
      })
      .addMatcher(api.endpoints.getPersons.matchFulfilled, (state, action) => {
        state.currentPage = { ...action.payload, isLoading: false, error: null };
      })
      .addMatcher(api.endpoints.getPersons.matchRejected, (state, action) => {
        state.currentPage.isLoading = false;
        state.currentPage.error = action.error;
      });
  },
});

export default personsSlice.reducer;
