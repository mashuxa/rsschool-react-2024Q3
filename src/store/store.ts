import { configureStore } from '@reduxjs/toolkit';
import personsReducer from './personsSlice/personsSlice.ts';

export const createStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      persons: personsReducer,
    },
    preloadedState,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
