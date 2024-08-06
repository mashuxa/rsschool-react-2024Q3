import personsReducer, { clearSelected, PersonsState, toggle } from './personsSlice';

import { configureStore } from '@reduxjs/toolkit';
import mockData from '../../__mocks__/persons.ts';

describe('Redux: Person Slice', () => {
  let store: ReturnType<typeof configureStore>;
  const getSelectedPersons = () => {
    const state = store.getState() as { persons: PersonsState };

    return state.persons.selectedPersons;
  };

  beforeEach(() => {
    store = configureStore({ reducer: { persons: personsReducer } });
  });

  it('Toggle action: should toggle selected person in store on toggle action', () => {
    const person = mockData[0];

    expect(getSelectedPersons()).toEqual({});

    store.dispatch(toggle(person));
    expect(getSelectedPersons()).toEqual({ [mockData[0].id]: person });

    store.dispatch(toggle(person));
    expect(getSelectedPersons()).toEqual({});
  });

  it('ClearSelected action: should unselect all persons on clearSelected action', () => {
    const person1 = mockData[0];
    const person2 = mockData[1];

    expect(getSelectedPersons()).toEqual({});

    store.dispatch(toggle(person1));
    store.dispatch(toggle(person2));

    expect(getSelectedPersons()).toEqual({ [person1.id]: person1, [person2.id]: person2 });

    store.dispatch(clearSelected());

    expect(getSelectedPersons()).toEqual({});
  });
});
