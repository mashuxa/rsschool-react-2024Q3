import { configureStore } from '@reduxjs/toolkit';
import api from '../api/api.ts';
import personsReducer from './personsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    persons: personsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
