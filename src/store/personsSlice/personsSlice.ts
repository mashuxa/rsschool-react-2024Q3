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
    previous: '',
    next: '',
    isLoading: false,
    error: null,
  },
  selectedPersons: {},
};

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
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
      .addMatcher(api.endpoints.getPersons.matchFulfilled, (state, action) => {
        state.currentPage = {
          ...action.payload,
          isLoading: false,
          error: null,
          results: normalizePersons(action.payload.results),
        };
      })
      .addMatcher(api.endpoints.getPersons.matchRejected, (state, action) => {
        state.currentPage.isLoading = false;
        state.currentPage.error = action.error;
      });
  },
});

export const { toggle, clearSelected } = personsSlice.actions;

export default personsSlice.reducer;
