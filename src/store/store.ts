import { configureStore } from '@reduxjs/toolkit';
import api from '../api/api.ts';
import personsReducer from './personsSlice/personsSlice.ts';

export const createStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      persons: personsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
