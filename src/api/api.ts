import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchDataType, Person } from '../types.ts';
import { API_URL as baseUrl } from './constatnts.ts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPersons: builder.query<FetchDataType<Person>, string>({
      query: (queryParams: string) => `people${queryParams}`,
    }),
    getPerson: builder.query<Person, string>({
      query: (id: string) => `people/${id}`,
    }),
  }),
});

export default api;
