import { API_URL, DEFAULT_PAGE } from "./constatnts";
import { FetchDataType, Person } from "src/types";
import { normalizePersons } from "../utils/utils";

export const fetchPersons = async (
  page?: string,
  search?: string,
): Promise<FetchDataType<Person>> => {
  try {
    const searchParam = search ? `&search=${search}` : "";

    const response = await fetch(
      `${API_URL}/people?page=${page || DEFAULT_PAGE}${searchParam}`,
    );

    if (!response.ok) {
      throw Error("Fetch Persons Error");
    }

    const persons = (await response.json()) as FetchDataType<Person>;

    return { ...persons, results: normalizePersons(persons.results) };
  } catch (e) {
    console.error(e);

    return { count: 0, results: [] };
  }
};

export const fetchDetails = async (id: string): Promise<Partial<Person>> => {
  try {
    const response = await fetch(`${API_URL}/people/${id}`);

    if (!response.ok) {
      throw Error("Fetch Details Error");
    }

    return (await response.json()) as Partial<Person>;
  } catch (e) {
    console.error(e);

    return {};
  }
};
