import { createSlice } from '@reduxjs/toolkit';
import { Person } from 'src/types.ts';

export interface PersonsState {
  selectedPersons: {
    [id: string]: Person;
  };
}

const initialState: PersonsState = {
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
});

export const { toggle, clearSelected } = personsSlice.actions;

export default personsSlice.reducer;
