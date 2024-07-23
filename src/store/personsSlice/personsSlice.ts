import { createSlice, SerializedError } from '@reduxjs/toolkit';
import api from '../../api/api.ts';
import { FetchDataType, Person } from '../../types.ts';
import { normalizePersons } from '../../utils/utils.ts';

interface CurrentPageType extends FetchDataType<Person> {
  isLoading: boolean;
  error: SerializedError | null;
}

export interface PersonsState {
  currentPage: CurrentPageType;
  selectedPersons: {
    [id: string]: Person;
  };
}

const initialState: PersonsState = {
  currentPage: {
    results: [],
    count: 0,
    isLoading: false,
    error: null,
  },
  selectedPersons: {},
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    updateCurrentPageData: (state, action: { payload: FetchDataType<Person>; type: string }) => {
      state.currentPage.results = normalizePersons(action.payload.results);
      state.currentPage.count = action.payload.count;
    },
    toggle: (state, action: { payload: Person; type: string }) => {
      const item = action.payload;

      if (state.selectedPersons[item.id]) {
        delete state.selectedPersons[item.id];
      } else {
        state.selectedPersons[item.id] = item;
      }
    },
    clearSelected: (state) => {
      state.selectedPersons = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getPersons.matchPending, (state) => {
        state.currentPage.isLoading = true;
        state.currentPage.error = null;
      })
      .addMatcher(api.endpoints.getPersons.matchFulfilled, (state) => {
        state.currentPage.isLoading = false;
        state.currentPage.error = null;
      })
      .addMatcher(api.endpoints.getPersons.matchRejected, (state, action) => {
        state.currentPage.isLoading = false;
        state.currentPage.error = action.error;
      });
  },
});

export const { toggle, clearSelected, updateCurrentPageData } = personsSlice.actions;

export default personsSlice.reducer;
