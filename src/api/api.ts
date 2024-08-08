import { FetchDataType, Person } from '../types.ts';
import { normalizePersons } from '../utils/utils.ts';
import { API_URL } from './constatnts.ts';

const fetchData = async <T>(input: string | URL | globalThis.Request) => {
  try {
    const response = await fetch(input);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return (await response.json()) as Promise<T | undefined>;
  } catch (e) {
    console.error(e);
  }
};

export const fetchPersons = async (page: string, search: string): Promise<FetchDataType<Person>> => {
  const searchParam = search ? `&search=${search}` : '';
  const persons = await fetchData<FetchDataType<Person>>(`${API_URL}/people?page=${page}${searchParam}`);

  if (!persons) {
    return { count: 0, results: [] };
  }

  return { ...persons, results: normalizePersons(persons.results) };
};

export const fetchDetails = async (id: string): Promise<Person> => {
  const details = await fetchData<Person>(`${API_URL}/people/${id}`);

  if (!details) {
    return {} as Person;
  }

  return details;
};
